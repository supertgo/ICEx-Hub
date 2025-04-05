import { PrismaClient, User } from '@prisma/client';
import { UserEntity, UserProps } from '@/user/domain/entities/user.entity';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';
import { UserModelMapper } from '@/user/infrastructure/database/prisma/models/user-model.mapper';
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder';

export class UserPrismaTestingHelper {
  static async createUser(
    prisma: PrismaClient,
    props: Partial<UserProps> = {},
  ): Promise<User> {
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prisma);

    return prisma.user.create({
      data: {
        ...UserDataBuilder(props),
        courseId: coursePeriod.courseId,
        coursePeriodId: coursePeriod.id,
      },
    });
  }

  static async createUserAsEntity(
    prisma: PrismaClient,
    props: Partial<UserProps> = {},
  ): Promise<UserEntity> {
    const user = await this.createUser(prisma, props);
    return UserModelMapper.toEntity(user);
  }
}
