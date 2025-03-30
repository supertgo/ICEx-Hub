import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { GetScheduleUsecase } from '@/schedule/application/usecases/get-schedule.usecase';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedule.usecase';
import { UpdateScheduleUsecase } from '@/schedule/application/usecases/update-schedule.usecase';
import { DeleteScheduleUsecase } from '@/schedule/application/usecases/delete-schedule.usecase';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';

@Module({
  imports: [AuthModule],
  controllers: [ScheduleController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'ScheduleRepository',
      useFactory: (prismaService: PrismaService) => {
        return new SchedulePrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: GetScheduleUsecase.UseCase,
      useFactory: (scheduleRepository: ScheduleRepository.Repository) => {
        return new GetScheduleUsecase.UseCase(scheduleRepository);
      },
      inject: ['ScheduleRepository'],
    },
    {
      provide: ListSchedulesUsecase.UseCase,
      useFactory: (scheduleRepository: ScheduleRepository.Repository) => {
        return new ListSchedulesUsecase.UseCase(scheduleRepository);
      },
      inject: ['ScheduleRepository'],
    },
    {
      provide: UpdateScheduleUsecase.UseCase,
      useFactory: (scheduleRepository: ScheduleRepository.Repository) => {
        return new UpdateScheduleUsecase.UseCase(scheduleRepository);
      },
      inject: ['ScheduleRepository'],
    },
    {
      provide: DeleteScheduleUsecase.UseCase,
      useFactory: (scheduleRepository: ScheduleRepository.Repository) => {
        return new DeleteScheduleUsecase.UseCase(scheduleRepository);
      },
      inject: ['ScheduleRepository'],
    },
  ],
})

export class ScheduleModule {}
