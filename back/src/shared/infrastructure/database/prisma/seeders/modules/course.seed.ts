import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const courseSeed = async (prisma: PrismaClient) => {
  const courses = [
    {
      name: 'Ciência da Computação',
      code: '02001',
    },
    {
      name: 'Sistemas de Informação',
      code: '02009',
    },
    {
      name: 'Matemática Computacional',
      code: '02006',
    },
    {
      name: 'Engenharia de Sistemas',
      code: '10008',
    },
    {
      name: 'Estatística',
      code: '02003',
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
