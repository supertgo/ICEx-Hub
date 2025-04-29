import { Discipline, PrismaClient } from '@prisma/client';
import { DisciplineProps } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';

export class DisciplinePrismaTestingHelper {
  static async createDiscipline(
    prisma: PrismaClient,
    props: Partial<DisciplineProps> = {},
  ): Promise<Discipline> {
    const courseId =
      props.courseId ??
      (await CoursePrismaTestingHelper.createCourse(prisma)).id;
    const coursePeriod =
      props.coursePeriodId ??
      (
        await prisma.coursePeriod.create({
          data: {
            name: 'Default Period',
            createdAt: new Date(),
            updatedAt: new Date(),
            courseId: courseId,
          },
        })
      ).id;
    return prisma.discipline.create({
      data: {
        ...DisciplineDataBuilder(props),
        code: props.code ?? 'DEFAULT_CODE',
        courseId: courseId,
        coursePeriodId: coursePeriod,
      },
    });
  }

  static async createDisciplines(
    prisma: PrismaClient,
    count: number = 1,
    overrides?: Partial<DisciplineProps>,
  ) {
    const course = await CoursePrismaTestingHelper.createCourse(prisma);
    const coursePeriod = await prisma.coursePeriod.create({
      data: {
        name: 'Default Period',
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: course.id,
      },
    });

    const entities = DisciplineEntity.fake().theDisciplines(count).build();

    return prisma.discipline.createMany({
      data: entities.map((entity) => ({
        ...entity.toJSON(),
        coursePeriodId: coursePeriod.id,
        courseId: course.id,
        ...overrides,
      })),
    });
  }
}
