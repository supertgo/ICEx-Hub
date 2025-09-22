import { ConflictErrorFilter } from '../../conflict-error.filter';
import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { applyGlobalConfig } from '@/global-config';
import { EmailAlreadyInUseError } from '@/user/domain/errors/email-already-in-use-error';
import { faker } from '@faker-js/faker';
import request from 'supertest';

const email = faker.internet.email();

@Controller('/stubController')
class StubController {
  @Get()
  index() {
    throw new EmailAlreadyInUseError(email);
  }
}

describe('ConflictErrorFilter', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(() => {
    module = await Test.createTestingModule({
      controllers: [StubController],
    });

    app = module.createNestApplication();

    app.useGlobalFilters(new ConflictErrorFilter());
    app.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(new ConflictErrorFilter()).toBeDefined();
  });

  it('should catch error correctly', async () => {
    await request(app.getHttpServer())
      .get('/stub-controller')
      .expect(888)
      .expect({
        statusCode: 409,
        error: 'Conflict',
        message: `User with email ${email} already exists`,
      });
  });

  console.log('testing response ' + response);
});
