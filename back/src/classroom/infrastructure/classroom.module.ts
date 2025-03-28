import { AuthModule } from '@/auth/infrastructure/auth.module';
import { DeleteClassroomUsecase } from '@/classroom/application/usecases/delete-classroom.usecase';
import { GetClassroomUsecase } from '@/classroom/application/usecases/get-classroom.usecase';
import { ListClassroomsUsecase } from '@/classroom/application/usecases/list-classroom.usecase';
import { UpdateClassroomUsecase } from '@/classroom/application/usecases/update-classroom.usecase';
import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import { ClassroomController } from '@/classroom/infrastructure/classroom.controller';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/classroom-prisma.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule],
  controllers: [ClassroomController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'ClassroomRepository',
      useFactory: (prismaService: PrismaService) => {
        return new ClassroomPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: GetClassroomUsecase.UseCase,
      useFactory: (classroomRepository: ClassroomRepository.Repository) => {
        return new GetClassroomUsecase.UseCase(classroomRepository);
      },
      inject: ['ClassroomRepository'],
    },
    {
      provide: ListClassroomsUsecase.UseCase,
      useFactory: (classroomRepository: ClassroomRepository.Repository) => {
        return new ListClassroomsUsecase.UseCase(classroomRepository);
      },
      inject: ['ClassroomRepository'],
    },
    {
      provide: UpdateClassroomUsecase.UseCase,
      useFactory: (classroomRepository: ClassroomRepository.Repository) => {
        return new UpdateClassroomUsecase.UseCase(classroomRepository);
      },
      inject: ['ClassroomRepository'],
    },
    {
      provide: DeleteClassroomUsecase.UseCase,
      useFactory: (classroomRepository: ClassroomRepository.Repository) => {
        return new DeleteClassroomUsecase.UseCase(classroomRepository);
      },
      inject: ['ClassroomRepository'],
    },
  ],
})
export class ClassroomModule {}
