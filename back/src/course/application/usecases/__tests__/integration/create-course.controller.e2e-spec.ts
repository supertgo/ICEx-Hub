import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { CourseModule } from '@/course/infrastructure/course.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { applyGlobalConfig } from '@/global-config';
import request from 'supertest';
 
describe('Create Course E2E Tests', () => {
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
 
  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });
 
  beforeEach(async () => {
    await resetDatabase(prismaService);
  });
 
  it('should create a course successfully', async () => {
    const body = { name: 'Ciência da Computação', code: 'CC001' };
 
    const response = await request(app.getHttpServer())
      .post('/course')
      .send(body)
      .expect(201);
 
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toBe(body.name);
    expect(response.body.data.code).toBe(body.code);
    expect(response.body.data.createdAt).toBeDefined();
 
    const dbCount = await prismaService.course.count();
    expect(dbCount).toBe(1);
  });
 
  it('should return 422 when name is missing', async () => {
    const body = { code: 'CC001' };
 
    const response = await request(app.getHttpServer())
      .post('/course')
      .send(body)
      .expect(422);
 
    expect(response.body.error).toBe('Unprocessable Entity');
  });
 
  it('should return 422 when code is missing', async () => {
    const body = { name: 'Ciência da Computação' };
 
    const response = await request(app.getHttpServer())
      .post('/course')
      .send(body)
      .expect(422);
 
    expect(response.body.error).toBe('Unprocessable Entity');
  });
 
  it('should return 422 when body is empty', async () => {
    const response = await request(app.getHttpServer())
      .post('/course')
      .send({})
      .expect(422);
 
    expect(response.body.error).toBe('Unprocessable Entity');
  });
 
  it('should return 422 when extra unknown fields are sent', async () => {
    const body = {
      name: 'Sistemas de Informação',
      code: 'SI002',
      unknownField: 'value',
    };
 
    const response = await request(app.getHttpServer())
      .post('/course')
      .send(body)
      .expect(422);
 
    expect(response.body.error).toBe('Unprocessable Entity');
  });
});