import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { resetDatabase, setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { CourseModule } from '@/course/infrastructure/course.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { applyGlobalConfig } from '@/global-config';
import request from 'supertest';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

describe('Index Course E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    setUpPrismaTest();
    module = await Test.createTestingModule({
      imports: [CourseModule, DatabaseModule.forTest(prismaService)],
    }).compile();

    app = module.createNestApplication();
    applyGlobalConfig(app);

    await app.init();
  });

  beforeEach(async () => {
    await resetDatabase(prismaService);
  });

  it('should return sorted by name asc, filtered and paginated', async () => {
    const entity1 = new CourseEntity(
      CourseDataBuilder({
        name: 'AB',
        code: 'asasddfkhgasdkljf',
      }),
    );

    await prismaService.course.create({
      data: entity1,
    });

    const entity2 = new CourseEntity(
      CourseDataBuilder({
        name: 'AA',
        code: 'asdfkhgasdkljf',
      }),
    );

    await prismaService.course.create({
      data: entity2,
    });

    const entity3 = new CourseEntity(
      CourseDataBuilder({
        name: 'AC',
        code: 'asdfkhgaasdsdkljf',
      }),
    );

    await prismaService.course.create({
      data: entity3,
    });

    const response = await request(app.getHttpServer())
      .get('/course')
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
      .get('/course')
      .query({ invalid: 'invalid' })
      .expect(422);

    expect(res.body.error).toBe('Unprocessable Entity');
    expect(res.body.message).toEqual(['property invalid should not exist']);
  });
});
