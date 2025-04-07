import { classroomSeed } from './modules/classroom.seed';
import { PrismaClient } from '@prisma/client';
import { courseSeed } from './modules/course.seed';
const prisma = new PrismaClient();

const seed = async () => {
  await classroomSeed(prisma);
  await courseSeed(prisma);
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
