import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '@/user/infrastructure/database/prisma/repositories/user-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { faker } from '@faker-js/faker';
import { UserWithIdNotFoundError } from '@/user/infrastructure/errors/user-with-id-not-found-error';
import { UpdatePasswordUsecase } from '@/user/application/usecases/update-password.usecase';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BcryptjsHashProvider } from '@/user/infrastructure/providers/hash-provider/bcryptjs-hash.provider';
import { UserPrismaTestingHelper } from '@/user/infrastructure/database/prisma/testing/user-prisma.testing-helper';

describe('Update password usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: UserPrismaRepository;
  let sut: UpdatePasswordUsecase.UseCase;
  let module: TestingModule;
  let hasProvider: HashProvider;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new UserPrismaRepository(prismaService as any);
    hasProvider = new BcryptjsHashProvider();
  });

  beforeEach(async () => {
    sut = new UpdatePasswordUsecase.UseCase(repository, hasProvider);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when user not found', () => {
    const id = faker.string.uuid();
    expect(() =>
      sut.execute({
        id,
        oldPassword: faker.internet.password(),
        newPassword: faker.internet.password(),
      }),
    ).rejects.toThrow(new UserWithIdNotFoundError(id));
  });

  it('should update a user password', async () => {
    const originalPassword = faker.internet.password();

    const user = await UserPrismaTestingHelper.createUser(prismaService, {
      password: await hasProvider.generateHash(originalPassword),
    });

    const output = await sut.execute({
      id: user.id,
      oldPassword: originalPassword,
      newPassword: faker.internet.password(),
    });

    expect(output.password).not.toBe(user.password);
  });
});
