import { CoursePeriod, PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '@/user/infrastructure/database/prisma/repositories/user-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { UserDataBuilderWithOptionalIds } from '@/user/domain/testing/helper/user-data-builder';
import { faker } from '@faker-js/faker';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BcryptjsHashProvider } from '@/user/infrastructure/providers/hash-provider/bcryptjs-hash.provider';
import { SignInUsecase } from '@/user/application/usecases/sign-in.usecase';
import { UserWithEmailNotFoundError } from '@/user/domain/errors/user-with-email-not-found-error';
import { InvalidCredentialsError } from '@/user/application/errors/invalid-credentials-error';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';

describe('Sign in usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: UserPrismaRepository;
  let sut: SignInUsecase.UseCase;
  let module: TestingModule;
  let hasProvider: HashProvider;
  let coursePeriod: CoursePeriod;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new UserPrismaRepository(prismaService as any);
    hasProvider = new BcryptjsHashProvider();
  });

  beforeEach(async () => {
    await resetDatabase(prismaService);

    sut = new SignInUsecase.UseCase(repository, hasProvider);
    coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);
  });

  afterAll(async () => {
    await resetDatabase(prismaService);

    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when user not found', () => {
    const email = faker.internet.email();
    expect(() =>
      sut.execute({
        email,
        password: faker.internet.password(),
      }),
    ).rejects.toThrow(new UserWithEmailNotFoundError(email));
  });

  it('should test with different password', async () => {
    const user = await prismaService.user.create({
      data: UserDataBuilderWithOptionalIds({
        password: await hasProvider.generateHash(faker.internet.password()),
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
      }),
    });

    await expect(() =>
      sut.execute({
        email: user.email,
        password: faker.internet.password(),
      }),
    ).rejects.toThrow(new InvalidCredentialsError());
  });

  it('should update a user password', async () => {
    const password = faker.internet.password();

    const user = await prismaService.user.create({
      data: UserDataBuilderWithOptionalIds({
        password: await hasProvider.generateHash(password),
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
      }),
    });

    const output = await sut.execute({
      email: user.email,
      password,
    });

    expect(output.id).toBe(user.id);
  });
});
