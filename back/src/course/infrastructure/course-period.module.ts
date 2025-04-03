import { Module } from '@nestjs/common';
import { CoursePeriodController } from '@/course/infrastructure/course-period.controller';
import { ListCoursePeriodUsecase } from '@/course/application/usecases/list-course-period.usecase';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { CoursePeriodPrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-period-prisma.repository';
import { CoursePeriodRepository } from '@/course/domain/repositories/course-period.repository';

@Module({
  controllers: [CoursePeriodController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'CoursePeriodRepository',
      useFactory: (prismaService: PrismaService) => {
        return new CoursePeriodPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'ListCoursePeriodUsecase',
      useFactory: (
        coursePeriodRepository: CoursePeriodRepository.Repository,
      ) => {
        return new ListCoursePeriodUsecase.UseCase(coursePeriodRepository);
      },
      inject: ['CoursePeriodRepository'],
    },
  ],
})
export class CoursePeriodModule {}
