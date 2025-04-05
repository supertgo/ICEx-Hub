import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

export function setUpPrismaTest() {
  execSync('npm run prisma:migrate-test');
}

export async function resetDatabase(prismaService: PrismaClient) {
  await prismaService.$executeRaw`TRUNCATE TABLE 
    users, students, disciplines, schedules, course_periods, courses 
    CASCADE`;
}
