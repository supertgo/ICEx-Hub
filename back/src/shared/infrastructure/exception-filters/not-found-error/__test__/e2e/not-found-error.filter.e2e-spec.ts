import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { UserWithIdNotFoundError } from '@/user/infrastructure/errors/user-with-id-not-found-error';
import { NotFoundErrorFilter } from '@/shared/infrastructure/exception-filters/not-found-error/not-found-error.filter';
import { UserWithEmailNotFoundError } from '@/user/domain/errors/user-with-email-not-found-error';
import { CourseWithIdNotFoundError } from '@/course/infrastructure/errors/course-with-id-not-found-error';
import { CoursePeriodWithIdNotFoundError } from '@/course/infrastructure/errors/course-period-with-id-not-found-error';

const id = faker.string.uuid();
const email = faker.internet.email();
const courseId = faker.string.uuid();
const coursePeriodId = faker.string.uuid();

@Controller('/stub')
class StubController {
  @Get('/user-id')
  userIdException() {
    throw new UserWithIdNotFoundError(id);
  }

  @Get('/user-email')
  userEmailException() {
    throw new UserWithEmailNotFoundError(email);
  }

  @Get('/course-id')
  courseIdException() {
    throw new CourseWithIdNotFoundError(courseId);
  }

  @Get('/course-period-id')
  coursePeriodIdException() {
    throw new CoursePeriodWithIdNotFoundError(coursePeriodId);
  }
}

describe('NotFoundErrorFilter', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = module.createNestApplication();

    app.useGlobalFilters(new NotFoundErrorFilter());
    await app.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(new NotFoundErrorFilter()).toBeDefined();
  });

  it('should catch user id error correctly', async () => {
    await request(app.getHttpServer())
      .get('/stub/user-id')
      .expect(404)
      .expect({
        statusCode: 404,
        error: 'Not Found',
        message: `User having id ${id} not found`,
      });
  });

  it('should catch user email error correctly', async () => {
    await request(app.getHttpServer())
      .get('/stub/user-email')
      .expect(404)
      .expect({
        statusCode: 404,
        error: 'Not Found',
        message: `User with email ${email} not found`,
      });
  });

  it('should catch course id error correctly', async () => {
    await request(app.getHttpServer())
      .get('/stub/course-id')
      .expect(404)
      .expect({
        statusCode: 404,
        error: 'Not Found',
        message: `Course having id ${courseId} not found`,
      });
  });

  it('should catch course period id error correctly', async () => {
    await request(app.getHttpServer())
      .get('/stub/course-period-id')
      .expect(404)
      .expect({
        statusCode: 404,
        error: 'Not Found',
        message: `Course period having id ${coursePeriodId} not found`,
      });
  });
});
