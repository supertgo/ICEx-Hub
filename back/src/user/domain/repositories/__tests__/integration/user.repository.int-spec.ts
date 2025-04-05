import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import {
  UserDataBuilder,
  UserDataBuilderWithOptionalIds,
} from '@/user/domain/testing/helper/user-data-builder';
import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '@/user/infrastructure/database/prisma/repositories/user-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { UserEntity } from '@/user/domain/entities/user.entity';
import { faker } from '@faker-js/faker';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { UserWithEmailNotFoundError } from '@/user/domain/errors/user-with-email-not-found-error';
import { UserWithIdNotFoundError } from '@/user/infrastructure/errors/user-with-id-not-found-error';
import { EmailAlreadyInUseError } from '@/user/domain/errors/email-already-in-use-error';
import { UserPrismaTestingHelper } from '@/user/infrastructure/database/prisma/testing/user-prisma.testing-helper';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';

describe('User prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: UserPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new UserPrismaRepository(prismaService as any);

    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await resetDatabase(prismaService);

    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when entity does not exist', () => {
    expect(() => sut.findById('1')).rejects.toThrowError(
      new UserWithIdNotFoundError('1'),
    );
  });

  it('should find user by id', async () => {
    const entity =
      await UserPrismaTestingHelper.createUserAsEntity(prismaService);

    const user = await sut.findById(entity.id);

    expect(sut).not.toBeNull();
    expect(user.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new user', async () => {
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const entity = new UserEntity(
      UserDataBuilderWithOptionalIds({
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
      }),
    );

    await sut.insert(entity);

    const user = await prismaService.user.findFirst({
      where: { email: entity.email },
    });

    expect(user).not.toBeNull();
    expect(user).toStrictEqual(entity.toJSON());
  });

  it('should return one user if theres only one with find all', async () => {
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const entity = new UserEntity(
      UserDataBuilderWithOptionalIds({
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
      }),
    );
    await sut.insert(entity);

    const users = await sut.findAll();

    expect(users).toHaveLength(1);
    expect(users[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should return users paginated', async () => {
    const entities = [];
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    for (let i = 0; i < 3; i++) {
      const entity = new UserEntity(
        UserDataBuilderWithOptionalIds({
          courseId: coursePeriod.courseId,
          coursePeriodId: coursePeriod.id,
        }),
      );
      await sut.insert(entity);
      entities.push(entity);
    }

    const users = await sut.findAll();

    expect(users).toHaveLength(3);

    entities.map((entity) => {
      const referenceUser = users.find((user) => user.email === entity.email);

      expect(referenceUser).not.toBeNull();
      expect(referenceUser.toJSON()).toStrictEqual(entity.toJSON());
      expect(referenceUser).toBeInstanceOf(UserEntity);
    });
  });

  it('should throw error when trying to update non-existent user', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new UserEntity(UserDataBuilder({}), nonExistentId);

    await expect(sut.update(entity)).rejects.toThrowError(
      new UserWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update a user successfully', async () => {
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const entity = new UserEntity(
      UserDataBuilderWithOptionalIds({
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
      }),
    );

    await sut.insert(entity);

    entity.update('John Updated');
    await sut.update(entity);

    const updatedUser = await prismaService.user.findUnique({
      where: { id: entity.id },
    });

    expect(updatedUser.name).toBe('John Updated');
  });

  it('should throw error when trying to delete non-existent user', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrowError(
      new UserWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a user successfully', async () => {
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const entity = new UserEntity(
      UserDataBuilderWithOptionalIds({
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
      }),
    );

    await sut.insert(entity);

    await sut.delete(entity.id);

    const userCount = await prismaService.user.count({
      where: { id: entity.id },
    });

    expect(userCount).toBe(0);
  });

  it('should find a user by email', async () => {
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const entity = new UserEntity(
      UserDataBuilderWithOptionalIds({
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
        email: 'john@example.com',
      }),
    );
    await sut.insert(entity);

    const user = await sut.findByEmail(entity.email);

    expect(user).not.toBeNull();
    expect(user.email).toBe('john@example.com');
    expect(user).toBeInstanceOf(UserEntity);
  });

  it('should throw error when trying to find a user by a non-existent email', async () => {
    await expect(
      sut.findByEmail('non-existent@example.com'),
    ).rejects.toThrowError(
      new UserWithEmailNotFoundError('non-existent@example.com'),
    );
  });

  it('should throw error if email is already in use', async () => {
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const entity = new UserEntity(
      UserDataBuilderWithOptionalIds({
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
        email: 'john@example.com',
      }),
    );

    await sut.insert(entity);

    await expect(sut.assureEmailIsAvailableToUse(entity.email)).rejects.toThrow(
      new EmailAlreadyInUseError(entity.email),
    );
  });

  it('should not throw error if email is available to use', async () => {
    await expect(
      sut.assureEmailIsAvailableToUse('non-existent@example.com'),
    ).resolves.not.toThrow();
  });

  describe('search tests', () => {
    it('should return with default values', async () => {
      const createdAtTime = new Date().getTime();
      const entities = [];
      for (let i = 0; i < 11; i++) {
        const coursePeriod =
          await CoursePeriodPrismaTestingHelper.createCoursePeriod(
            prismaService,
          );

        const entity = new UserEntity(
          UserDataBuilderWithOptionalIds({
            courseId: coursePeriod.courseId,
            coursePeriodId: coursePeriod.id,
            createdAt: new Date(createdAtTime - i),
            name: `${i}`,
          }),
        );

        await sut.insert(entity);
        entities.push(entity);
      }

      const searchResult = await sut.search(new UserRepository.SearchParams());

      expect(searchResult).not.toBeNull();
      expect(searchResult).toBeInstanceOf(UserRepository.SearchResult);
      expect(searchResult.items).toHaveLength(10);
      expect(searchResult.total).toBe(11);

      for (let i = 0; i < 11; i++) {
        const referenceUser = searchResult.items.find(
          (user) => user.email === entities[i].email,
        );

        if (i < 10) {
          expect(referenceUser.name).toBe(`${i}`);
          expect(referenceUser).not.toBeNull();
          expect(referenceUser.toJSON()).toStrictEqual(entities[i].toJSON());
          expect(referenceUser).toBeInstanceOf(UserEntity);
        } else {
          expect(referenceUser).toBeUndefined();
        }
      }
    });

    it('should filter users by name', async () => {
      await UserPrismaTestingHelper.createUserAsEntity(prismaService, {
        name: 'John',
      });
      await UserPrismaTestingHelper.createUserAsEntity(prismaService, {
        name: 'Jane',
      });
      await UserPrismaTestingHelper.createUserAsEntity(prismaService, {
        name: 'Alice',
      });

      const searchResult = await sut.search(
        new UserRepository.SearchParams({ filter: 'Ja' }),
      );

      expect(searchResult.items).toHaveLength(1);
      expect(searchResult.total).toBe(1);
      expect(searchResult.items[0].name).toContain('Jane');
    });

    it('should sort users by name in ascending order', async () => {
      await UserPrismaTestingHelper.createUserAsEntity(prismaService, {
        name: 'Zoe',
      });
      await UserPrismaTestingHelper.createUserAsEntity(prismaService, {
        name: 'Alice',
      });
      await UserPrismaTestingHelper.createUserAsEntity(prismaService, {
        name: 'John',
      });

      const searchResult = await sut.search(
        new UserRepository.SearchParams({
          sort: 'name',
          sortDir: SortOrderEnum.ASC,
        }),
      );

      expect(searchResult.items.map((user) => user.name)).toEqual([
        'Alice',
        'John',
        'Zoe',
      ]);
    });

    it('should paginate users', async () => {
      for (let i = 0; i < 15; i++) {
        await UserPrismaTestingHelper.createUser(prismaService, {
          name: `User ${i}`,
        });
      }

      const searchResult = await sut.search(
        new UserRepository.SearchParams({ page: 2, perPage: 5 }),
      );

      expect(searchResult.items).toHaveLength(5);
      expect(searchResult.currentPage).toBe(2);
      expect(searchResult.total).toBe(15);
    });

    it('should sort users by createdAt in descending order', async () => {
      const createdAtTime = new Date().getTime();
      for (let i = 0; i < 3; i++) {
        await UserPrismaTestingHelper.createUser(prismaService, {
          name: `User ${i}`,
          createdAt: new Date(createdAtTime - i),
        });
      }

      const searchResult = await sut.search(
        new UserRepository.SearchParams({
          sort: 'createdAt',
          sortDir: SortOrderEnum.DESC,
        }),
      );

      expect(searchResult.items[0].createdAt.getTime()).toBeGreaterThan(
        searchResult.items[1].createdAt.getTime(),
      );
      expect(searchResult.items[1].createdAt.getTime()).toBeGreaterThan(
        searchResult.items[2].createdAt.getTime(),
      );
    });
  });
});
