import { SignUpDto } from '@/user/infrastructure/dtos/sign-up.dto';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { PrismaClient } from '@prisma/client';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { UserModule } from '@/user/infrastructure/user.module';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import request from 'supertest';
import { UserController } from '@/user/infrastructure/user.controller';
import { instanceToPlain } from 'class-transformer';
import { applyGlobalConfig } from '@/global-config';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';

describe('Create user e2e tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: UserRepository.Repository;
  let signUpDto: SignUpDto;
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    setUpPrismaTest();
    module = await Test.createTestingModule({
      imports: [
        UserModule,
        EnvConfigModule,
        DatabaseModule.forTest(prismaService),
      ],
    }).compile();

    app = module.createNestApplication();
    applyGlobalConfig(app);
    await app.init();

    repository = module.get<UserRepository.Repository>('UserRepository');
  });

  beforeEach(async () => {
    await resetDatabase(prismaService);

    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    signUpDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      courseId: coursePeriod.courseId,
      coursePeriodId: coursePeriod.id,
    };
  });

  afterAll(async () => {
    await resetDatabase(prismaService);
  });

  it('should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(signUpDto)
      .expect(201);

    expect(response.body).toHaveProperty('data');

    expect(Object.keys(response.body.data)).toStrictEqual([
      'id',
      'name',
      'email',
      'courseId',
      'coursePeriodId',
      'createdAt',
    ]);

    expect(response.body.data).toMatchObject({
      id: expect.any(String),
      name: signUpDto.name,
      email: signUpDto.email,
      createdAt: expect.any(String),
    });

    const user = await repository.findById(response.body.data.id);

    expect(user).toBeDefined();
    expect(user.courseId).toBe(signUpDto.courseId);
    expect(user.coursePeriodId).toBe(signUpDto.coursePeriodId);

    const presenter = UserController.userToResponse(user.toJSON());
    const serialized = instanceToPlain(presenter);

    expect(response.body.data).toStrictEqual(serialized);
  });

  it('should return error when no parameter in body', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send()
      .expect(422);

    expect(response.body).toHaveProperty('error');

    expect(response.body).toMatchObject({
      error: 'Unprocessable Entity',
      message: [
        'name should not be empty',
        'name must be a string',
        'email must be an email',
        'email should not be empty',
        'email must be a string',
        'password should not be empty',
        'password must be a string',
        'courseId should not be empty',
        'courseId must be a string',
        'coursePeriodId should not be empty',
        'coursePeriodId must be a string',
      ],
      statusCode: 422,
    });
  });

  it('should return error when name is not a string', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
        name: 123 as any,
      })
      .expect(422);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Unprocessable Entity',
      message: ['name must be a string'],
      statusCode: 422,
    });
  });

  it('should return error when email is not valid', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
        email: 'invalid-email',
      })
      .expect(422);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Unprocessable Entity',
      message: ['email must be an email'],
      statusCode: 422,
    });
  });

  it('should return error when password is not a string', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
        password: {} as any,
      })
      .expect(422);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Unprocessable Entity',
      message: ['password must be a string'],
      statusCode: 422,
    });
  });

  it('should return error when courseId is not a string', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
        courseId: {} as any,
      })
      .expect(422);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Unprocessable Entity',
      message: ['courseId must be a string'],
      statusCode: 422,
    });
  });

  it('should return error when coursePeriod is not a string', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
        coursePeriodId: {} as any,
      })
      .expect(422);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Unprocessable Entity',
      message: ['coursePeriodId must be a string'],
      statusCode: 422,
    });
  });

  it('should return error with invalid propriety', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
        invalid: 'invalid',
      })
      .expect(422);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Unprocessable Entity',
      message: ['property invalid should not exist'],
      statusCode: 422,
    });
  });

  it('should return error when the email is duplicated', async () => {
    await prismaService.user.create({ data: signUpDto });
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
      })
      .expect(409);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Conflict',
      message: `User with email ${signUpDto.email} already exists`,
    });
  });

  it('should return an error when the course does not exist', async () => {
    const courseId = faker.string.uuid();
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
        courseId,
      })
      .expect(404);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Not Found',
      message: `Course having id ${courseId} not found`,
    });
  });

  it('should return an error when the coursePeriod does not exist', async () => {
    const coursePeriodId = faker.string.uuid();
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        ...signUpDto,
        coursePeriodId,
      })
      .expect(404);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toMatchObject({
      error: 'Not Found',
      message: `Course period having id ${coursePeriodId} not found`,
    });
  });
});
