import { classroomSeed } from './modules/classroom.seed';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {
  await classroomSeed(prisma);
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
