import { faker } from '@faker-js/faker';
import { DayPattern, PrismaClient, TimeSlot } from '@prisma/client';
import { disciplinesSI } from './discipline.seed';
import { icexClassrooms, cadClassrooms } from './classroom.seed';
import { CLASSROOM_BUILDING } from '@/classroom/domain/classroom.constants';

export const schedules = [
  {
    id: faker.string.uuid(),
    disciplineName: 'Geometria Analítica e Álgebra Linear',
    disciplineCode: 'MAT038',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '1026',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TZ2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Geometria Analítica e Álgebra Linear',
    disciplineCode: 'MAT038',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.MORNING_2,
    classroomName: '311',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TB5',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Introdução à Lógica Computacional',
    disciplineCode: 'DCC638',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_2,
    classroomName: '2009',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TN',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Introdução à Lógica Computacional',
    disciplineCode: 'DCC638',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '313',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ1',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Programação e Desenvolvimento de Software I',
    disciplineCode: 'DCC203',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.MORNING_1,
    classroomName: '307',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TA',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Programação e Desenvolvimento de Software I',
    disciplineCode: 'DCC203',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '307',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Fundamentos de Sistemas de Informação',
    disciplineCode: 'DCC044',
    dayPattern: DayPattern.FRIDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '1015',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Cálculo Diferencial e Integral I',
    disciplineCode: 'MAT001',
    dayPattern: DayPattern.MONDAY_WEDNESDAY_FRIDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '208',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TM2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Cálculo Diferencial e Integral I',
    disciplineCode: 'MAT001',
    dayPattern: DayPattern.MONDAY_WEDNESDAY_FRIDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '412',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Matemática Discreta',
    disciplineCode: 'DCC216',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '413',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TM1',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Matemática Discreta',
    disciplineCode: 'DCC216',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '410',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Programação e Desenvolvimento de Software II',
    disciplineCode: 'DCC204',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '212',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Programação e Desenvolvimento de Software II',
    disciplineCode: 'DCC204',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '310',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TM2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Álgebra Linear Computacional',
    disciplineCode: 'DCC639',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '1022',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TM',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Álgebra Linear Computacional',
    disciplineCode: 'DCC639',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '2013',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TZ TZ1 TZ3',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Economia A I',
    disciplineCode: 'ECN140',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '213',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Economia A I',
    disciplineCode: 'ECN140',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '1018',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TE',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Cálculo Diferencial e Integral II',
    disciplineCode: 'MAT039',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '410',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Cálculo Diferencial e Integral II',
    disciplineCode: 'MAT039',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '407',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TM2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Introdução a Sistemas Lógicos',
    disciplineCode: 'DCC114',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '309',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ1',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Introdução a Sistemas Lógicos',
    disciplineCode: 'DCC114',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '2013',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TZ2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Estruturas de Dados',
    disciplineCode: 'DCC205',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '308',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Estruturas de Dados',
    disciplineCode: 'DCC205',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.AFTERNOON_2,
    classroomName: '308',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TN1 / TN2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Introdução a Bancos de Dados',
    disciplineCode: 'DCC011',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '207',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TE',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Introdução a Bancos de Dados',
    disciplineCode: 'DCC011',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '2009',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TM2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Estatística e Probabilidades',
    disciplineCode: 'EST031',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '307',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TM1',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Estatística e Probabilidades',
    disciplineCode: 'EST031',
    dayPattern: DayPattern.TUESDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '302',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TE1 / TE2',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Usuários da Informação',
    disciplineCode: 'TGI004',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '1015',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Organização de Computadores',
    disciplineCode: 'DCC006',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '212',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Organização de Computadores',
    disciplineCode: 'DCC006',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '213',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TM1',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Algoritmos I',
    disciplineCode: 'DCC206',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '307',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Algoritmos I',
    disciplineCode: 'DCC206',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.AFTERNOON_2,
    classroomName: '307',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TN',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Administração de Recursos Humanos',
    disciplineCode: 'CAD163',
    dayPattern: DayPattern.FRIDAY,
    timeSlot: TimeSlot.EVENING_1_2,
    classroomName: '213',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Organização e Tratamento da Informação',
    disciplineCode: 'OTI071',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '413',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Interação Humano Computador',
    disciplineCode: 'DCC194',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '312',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ1',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Linguagens de Programação',
    disciplineCode: 'DCC024',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '1019',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Linguagens de Programação',
    disciplineCode: 'DCC024',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '1025',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TM',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Introdução à Contabilidade',
    disciplineCode: 'CIC010',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '410',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Introdução à Contabilidade',
    disciplineCode: 'CIC010',
    dayPattern: DayPattern.TUESDAY_THURSDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '1020',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Administração da Produção',
    disciplineCode: 'CAD004',
    dayPattern: DayPattern.FRIDAY,
    timeSlot: TimeSlot.EVENING_1_2,
    classroomName: '1017',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Engenharia de Software',
    disciplineCode: 'DCC094',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '1015',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Engenharia de Software',
    disciplineCode: 'DCC094',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_2,
    classroomName: '210',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TN',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Sistemas Operacionais',
    disciplineCode: 'DCC605',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '302',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Sistemas Operacionais',
    disciplineCode: 'DCC605',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_1,
    classroomName: '212',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TM',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Administração de Custos',
    disciplineCode: 'CAD153',
    dayPattern: DayPattern.FRIDAY,
    timeSlot: TimeSlot.EVENING_1_2,
    classroomName: '1026',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Engenharia de Software II',
    disciplineCode: 'DCC072',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_1,
    classroomName: '211',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Redes de Computadores',
    disciplineCode: 'DCC023',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '406',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Redes de Computadores',
    disciplineCode: 'DCC023',
    dayPattern: DayPattern.MONDAY_WEDNESDAY,
    timeSlot: TimeSlot.AFTERNOON_2,
    classroomName: '311',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TN',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Administração Financeira',
    disciplineCode: 'CAD167',
    dayPattern: DayPattern.FRIDAY,
    timeSlot: TimeSlot.EVENING_1_2,
    classroomName: '207',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Administração Mercadológica',
    disciplineCode: 'CAD164',
    dayPattern: DayPattern.FRIDAY,
    timeSlot: TimeSlot.EVENING_1_2,
    classroomName: '212',
    ClassroomBulding: CLASSROOM_BUILDING.CAD3,
    class: 'TZ',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Ética na Computação',
    disciplineCode: 'DCC636',
    dayPattern: DayPattern.TUESDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '2015',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Ética na Computação',
    disciplineCode: 'DCC636',
    dayPattern: DayPattern.TUESDAY,
    timeSlot: TimeSlot.AFTERNOON_2,
    classroomName: '2015',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TW1',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Computação e Sociedade',
    disciplineCode: 'DCC637',
    dayPattern: DayPattern.THURSDAY,
    timeSlot: TimeSlot.EVENING_2,
    classroomName: '2015',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TW',
  },

  {
    id: faker.string.uuid(),
    disciplineName: 'Computação e Sociedade',
    disciplineCode: 'DCC637',
    dayPattern: DayPattern.THURSDAY,
    timeSlot: TimeSlot.AFTERNOON_2,
    classroomName: '2015',
    ClassroomBulding: CLASSROOM_BUILDING.ICEX,
    class: 'TN1',
  },
];

export const scheduleSeed = async (prisma: PrismaClient) => {
  for (const schedule of schedules) {
    await prisma.schedule.upsert({
      where: {
        unique_classroom_schedule: {
          classroomId: getClassroomId(
            schedule.ClassroomBulding,
            schedule.classroomName,
          ),
          dayPattern: schedule.dayPattern,
          timeSlot: schedule.timeSlot,
          class: schedule.class,
        },
      },
      update: {
        id: schedule.id,
        disciplineId: getDisciplineId(schedule.disciplineCode),
        classroomId: getClassroomId(
          schedule.ClassroomBulding,
          schedule.classroomName,
        ),
        class: schedule.class,
      },
      create: {
        id: schedule.id,
        disciplineId: getDisciplineId(schedule.disciplineCode),
        classroomId: getClassroomId(
          schedule.ClassroomBulding,
          schedule.classroomName,
        ),
        dayPattern: schedule.dayPattern,
        timeSlot: schedule.timeSlot,
        class: schedule.class,
      },
    });
  }
};

function getClassroomId(building: CLASSROOM_BUILDING, name: string) {
  if (building === CLASSROOM_BUILDING.ICEX) {
    return icexClassrooms.find((classroom) => classroom.name === name).id;
  } else {
    return cadClassrooms.find((classroom) => classroom.name === name).id;
  }
}

function getDisciplineId(code: string) {
  try {
    return disciplinesSI.find((discipline) => discipline.code === code).id;
  } catch (e) {
    throw 'error ' + e;
  }
}
