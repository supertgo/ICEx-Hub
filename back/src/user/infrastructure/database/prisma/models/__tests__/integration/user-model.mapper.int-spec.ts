import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserModelMapper } from '@/user/infrastructure/database/prisma/models/user-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { UserEntity } from '@/user/domain/entities/user.entity';
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';

describe('User model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();

    prismaService = new PrismaService();
    props = UserDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when user model is invalid', () => {
    const model: User = Object.assign({}, props, { name: null });

    expect(() => UserModelMapper.toEntity(model)).toThrow(
      new ValidationErrors('Could not load user having id undefined'),
    );
  });

  it('should map user model to entity', async () => {
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);
    const model: User = await prismaService.user.create({
      data: {
        ...props,
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
      },
    });

    const sut = UserModelMapper.toEntity(model);

    expect(sut).toBeInstanceOf(UserEntity);

    expect(sut.id).toBe(model.id);
    expect(sut.name).toBe(model.name);
    expect(sut.email).toBe(model.email);
    expect(sut.password).toBe(model.password);
    expect(sut.createdAt).toBe(model.createdAt);
    expect(sut.courseId).toBe(model.courseId);
    expect(sut.coursePeriodId).toBe(model.coursePeriodId);
  });
});
