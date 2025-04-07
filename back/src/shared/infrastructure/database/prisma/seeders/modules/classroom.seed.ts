import { CLASSROOM_BUILDING } from '@/classroom/domain/classroom.constants';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const classroomSeed = async (prisma: PrismaClient) => {
  const icexClassrooms = Array.from({ length: 37 }, (_, i) =>
    (1001 + i).toString(),
  )
    .concat(Array.from({ length: 39 }, (_, i) => (2001 + i).toString()))
    .concat(Array.from({ length: 34 }, (_, i) => (2042 + i).toString()))
    .concat(['Auditório 1', 'Auditório 2', 'Auditório 3'])
    .map((room) => ({
      name: room,
      building: CLASSROOM_BUILDING.ICEX,
    }));

  const cadClassrooms = Array.from({ length: 3 }, (_, x) =>
    Array.from({ length: 13 }, (_, i) => ({
      name: `${x + 2}${(i + 1).toString().padStart(2, '0')}`,
      building: CLASSROOM_BUILDING.CAD3,
    })),
  ).flat();

  const classrooms = [...icexClassrooms, ...cadClassrooms];

  for (const classroom of classrooms) {
    await prisma.classroom.upsert({
      where: {
        name_building: {
          name: classroom.name,
          building: classroom.building,
        },
      },
      update: {},
      create: {
        id: faker.string.uuid(),
        name: classroom.name,
        building: classroom.building,
      },
    });
  }
};
