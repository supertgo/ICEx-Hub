import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { courses } from './course.seed';
import { coursePeriods } from './course.period.seed';

const courseSI = courses.find((course) => {
  return course.code === 'SI';
});

export const disciplinesSI = [
  {
    id: faker.string.uuid(),
    name: 'Geometria Analítica e Álgebra Linear',
    code: 'MAT038',
    periodo: 1,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Introdução à Lógica Computacional',
    code: 'DCC638',
    periodo: 1,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Programação e Desenvolvimento de Software I',
    code: 'DCC203',
    periodo: 1,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Fundamentos de Sistemas de Informação',
    code: 'DCC044',
    periodo: 1,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Administração TGA (EAD)',
    code: 'CAD103',
    periodo: 1,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Cálculo Diferencial e Integral I',
    code: 'MAT001',
    periodo: 2,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Matemática Discreta',
    code: 'DCC111',
    periodo: 2,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Programação e Desenvolvimento de Software II',
    code: 'DCC204',
    periodo: 2,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Álgebra Linear Computacional',
    code: 'DCC639',
    periodo: 2,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Economia A I',
    code: 'ECN101',
    periodo: 2,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Cálculo Diferencial e Integral II',
    code: 'MAT039',
    periodo: 3,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Introdução a Sistemas Lógicos',
    code: 'DCC114',
    periodo: 3,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Estruturas de Dados',
    code: 'DCC205',
    periodo: 3,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Introdução a Bancos de Dados',
    code: 'DCC011',
    periodo: 3,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Estatística e Probabilidades',
    code: 'EST031',
    periodo: 3,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Usuários da Informação',
    code: 'TGI004',
    periodo: 4,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Organização de Computadores',
    code: 'DCC006',
    periodo: 4,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Algoritmos I',
    code: 'DCC206',
    periodo: 4,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Administração de Recursos Humanos',
    code: 'CAD163',
    periodo: 4,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Organização e Tratamento da Informação',
    code: 'OTI071',
    periodo: 5,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Interação Humano Computador',
    code: 'DCC194',
    periodo: 5,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Linguagens de Programação',
    code: 'DCC024',
    periodo: 5,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Introdução à Contabilidade',
    code: 'CIC010',
    periodo: 5,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Administração da Produção',
    code: 'CAD004',
    periodo: 5,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Engenharia de Software',
    code: 'DCC063',
    periodo: 6,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Sistemas Operacionais',
    code: 'DCC065',
    periodo: 6,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Administração de Custos',
    code: 'CAD153',
    periodo: 6,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Engenharia de Software II',
    code: 'DCC072',
    periodo: 7,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Redes de Computadores',
    code: 'DCC023',
    periodo: 7,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Administração Financeira',
    code: 'CAD167',
    periodo: 7,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Monografia em Sistemas de Informação I',
    code: 'DCC046',
    periodo: 8,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Administração Mercadológica',
    code: 'CAD164',
    periodo: 8,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Ética na Computação',
    code: 'DCC636',
    periodo: 8,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Computação e Sociedade',
    code: 'DCC637',
    periodo: 8,
    courseId: courseSI.id,
  },
  {
    id: faker.string.uuid(),
    name: 'Monografia em Sistemas de Informação II',
    code: 'DCC073',
    periodo: 9,
    courseId: courseSI.id,
  },
];

export const disciplineSeed = async (prisma: PrismaClient) => {
  for (const discipline of disciplinesSI) {
    await prisma.discipline.create({
      data: {
        id: discipline.id,
        name: discipline.name,
        code: discipline.code,
        courseId: discipline.courseId,
        coursePeriodId: coursePeriods.find((elem) => {
          return (
            elem.courseId === discipline.courseId &&
            elem.name === `${discipline.periodo}º período`
          );
        }).id,
      },
    });
  }
};
