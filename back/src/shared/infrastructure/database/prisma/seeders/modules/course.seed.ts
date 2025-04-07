import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const courseSeed = async (prisma: PrismaClient) => {
  const courses = [
    {
      name: 'Ciência da Computação',
      code: 'CC',
    },
    {
      name: 'Sistemas de Informação',
      code: 'SI',
    },
    {
      name: 'Matemática Computacional',
      code: 'MATCOMP',
    },
    {
      name: 'Engenharia de Sistemas',
      code: 'ES',
    },
    {
      name: 'Estatística',
      code: 'EST',
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: {
        code: course.code,
      },
      update: {},
      create: {
        id: faker.string.uuid(),
        name: course.name,
        code: course.code,
      },
    });
  }
};
