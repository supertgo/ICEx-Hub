import { Module } from '@nestjs/common';
import { DisciplineController } from './discipline.controller';
import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import { GetDisciplineUsecase } from '@/discipline/application/usecases/get-discipline.usecase';
import { ListDisciplinesUsecase } from '@/discipline/application/usecases/list-discipline.usecase';
import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';
import { DeleteDisciplineUsecase } from '@/discipline/application/usecases/delete-discipline.usecase';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { AuthModule } from '@/auth/infrastructure/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DisciplineController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'DisciplineRepository',
      useFactory: (prismaService: PrismaService) => {
        return new DisciplinePrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: GetDisciplineUsecase.UseCase,
      useFactory: (disciplineRepository: DisciplineRepository.Repository) => {
        return new GetDisciplineUsecase.UseCase(disciplineRepository);
      },
      inject: ['DisciplineRepository'],
    },
    {
      provide: ListDisciplinesUsecase.UseCase,
      useFactory: (disciplineRepository: DisciplineRepository.Repository) => {
        return new ListDisciplinesUsecase.UseCase(disciplineRepository);
      },
      inject: ['DisciplineRepository'],
    },
    {
      provide: UpdateDisciplineUsecase.UseCase,
      useFactory: (disciplineRepository: DisciplineRepository.Repository) => {
        return new UpdateDisciplineUsecase.UseCase(disciplineRepository);
      },
      inject: ['DisciplineRepository'],
    },
    {
      provide: DeleteDisciplineUsecase.UseCase,
      useFactory: (disciplineRepository: DisciplineRepository.Repository) => {
        return new DeleteDisciplineUsecase.UseCase(disciplineRepository);
      },
      inject: ['DisciplineRepository'],
    },
  ],
})

export class DisciplineModule {}
