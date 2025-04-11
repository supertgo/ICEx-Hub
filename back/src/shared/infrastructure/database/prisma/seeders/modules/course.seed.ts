import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
export const courses = [
  {
    name: 'Ciência da Computação',
    code: 'CC',
    id: faker.string.uuid(),
    numberOfPeriods: 10,
  },
  {
    name: 'Sistemas de Informação',
    code: 'SI',
    id: faker.string.uuid(),
    numberOfPeriods: 9,
  },
  {
    name: 'Matemática Computacional',
    code: 'MATCOMP',
    id: faker.string.uuid(),
    numberOfPeriods: 8,
  },
  {
    name: 'Engenharia de Sistemas',
    code: 'ES',
    id: faker.string.uuid(),
    numberOfPeriods: 12,
  },
  {
    name: 'Estatística',
    code: 'EST',
    id: faker.string.uuid(),
    numberOfPeriods: 8,
  },
];

export const courseSeed = async (prisma: PrismaClient) => {
  for (const course of courses) {
    await prisma.course.upsert({
      where: {
        code: course.code,
      },
      update: {
        id: course.id,
      },
      create: {
        id: course.id,
        name: course.name,
        code: course.code,
      },
    });
  }
};
