import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { applyGlobalConfig } from '@/global-config';
import request from 'supertest';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { CoursePeriodModule } from '@/course/infrastructure/course-period.module';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';

describe('Index Course Period E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    setUpPrismaTest();
    module = await Test.createTestingModule({
      imports: [CoursePeriodModule, DatabaseModule.forTest(prismaService)],
    }).compile();

    app = module.createNestApplication();
    applyGlobalConfig(app);

    await app.init();
  });

  beforeEach(async () => {
    await prismaService.coursePeriod.deleteMany();
    await prismaService.course.deleteMany();
  });

  afterAll(async () => {
    await prismaService.coursePeriod.deleteMany();
    await prismaService.course.deleteMany();
  });

  it('should return sorted by name asc, filtered and paginated', async () => {
    await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService, {
      name: 'AB',
    });

    await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService, {
      name: 'AA',
    });

    await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService, {
      name: 'Ac',
    });

    const response = await request(app.getHttpServer())
      .get('/course-period')
      .query({
        filter: 'A',
        sort: 'name',
        sortDir: SortOrderEnum.ASC,
        perPage: 2,
      })
      .expect(200);

    const data = response.body.data;

    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('AA');
    expect(data[1].name).toBe('AB');

    const meta = response.body.meta;
    expect(meta.currentPage).toBe(1);
    expect(meta.lastPage).toBe(2);
    expect(meta.perPage).toBe(2);
    expect(meta.total).toBe(3);
  });

  it('should return a error with invalid fields', async () => {
    const res = await request(app.getHttpServer())
      .get('/course-period')
      .query({ invalid: 'invalid' })
      .expect(422);

    expect(res.body.error).toBe('Unprocessable Entity');
    expect(res.body.message).toEqual(['property invalid should not exist']);
  });
});
