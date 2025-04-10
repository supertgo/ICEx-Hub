import { classroomSeed } from './modules/classroom.seed';
import { PrismaClient } from '@prisma/client';
import { courseSeed } from './modules/course.seed';
import { coursePeriodSeed } from './modules/course.period.seed';
import { disciplineSeed } from './modules/discipline.seed';
const prisma = new PrismaClient();

const seed = async () => {
  await classroomSeed(prisma);
  await courseSeed(prisma);
  await coursePeriodSeed(prisma);
  await disciplineSeed(prisma);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
