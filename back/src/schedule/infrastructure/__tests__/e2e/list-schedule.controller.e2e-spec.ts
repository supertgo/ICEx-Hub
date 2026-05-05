import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { ScheduleModule } from '@/schedule/infrastructure/schedule.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { applyGlobalConfig } from '@/global-config';
import request from 'supertest';
import { SchedulePrismaTestingHelper } from '@/schedule/infrastructure/database/prisma/testing/schedule-prismaa.testing-helper';
import { AuthService } from '@/auth/infrastructure/auth.service';
import { UserModule } from '@/user/infrastructure/user.module';

describe('List Schedule E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let authService: AuthService;
  let accessToken: string;
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    setUpPrismaTest();
    module = await Test.createTestingModule({
      imports: [
        ScheduleModule,
        UserModule,
        EnvConfigModule,
        DatabaseModule.forTest(prismaService),
      ],
    }).compile();

    app = module.createNestApplication();
    applyGlobalConfig(app);
    await app.init();

    authService = module.get<AuthService>(AuthService);
  });

  beforeEach(async () => {
    await resetDatabase(prismaService);

    const user = await prismaService.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        password: 'hashed-password',
      },
    });

    const token = await authService.generateJwt(user.id);
    accessToken = token.accessToken;
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should return 401 when no token is provided', async () => {
    await request(app.getHttpServer()).get('/schedule').expect(401);
  });

  it('should return an empty list when no schedules exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/schedule')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.data).toHaveLength(0);
    expect(response.body.meta.total).toBe(0);
  });

  it('should return a paginated list of schedules', async () => {
    await SchedulePrismaTestingHelper.createCompleteSchedules(prismaService, 3);

    const response = await request(app.getHttpServer())
      .get('/schedule')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ perPage: 2, page: 1 })
      .expect(200);

    expect(response.body.data).toHaveLength(2);
    expect(response.body.meta.total).toBe(3);
    expect(response.body.meta.perPage).toBe(2);
    expect(response.body.meta.currentPage).toBe(1);
    expect(response.body.meta.lastPage).toBe(2);
  });

  it('should return schedules with correct fields', async () => {
    await SchedulePrismaTestingHelper.createCompleteSchedules(prismaService, 1);

    const response = await request(app.getHttpServer())
      .get('/schedule')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.data).toHaveLength(1);
    const schedule = response.body.data[0];

    expect(schedule).toHaveProperty('id');
    expect(schedule).toHaveProperty('timeSlot');
    expect(schedule).toHaveProperty('dayPattern');
    expect(schedule).toHaveProperty('classroom');
    expect(schedule).toHaveProperty('discipline');
  });

  it('should return 422 when invalid query params are sent', async () => {
    const response = await request(app.getHttpServer())
      .get('/schedule')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ invalidParam: 'value' })
      .expect(422);

    expect(response.body.error).toBe('Unprocessable Entity');
  });
});