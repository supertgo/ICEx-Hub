import { Module } from '@nestjs/common';
import { NewEntityController } from './new-entity.controller';
import { NewEntityRepository } from '@/new-entity/domain/repositories/new-entity.repository';
import { GetNewEntityUsecase } from '@/new-entity/application/usecases/get-new-entity.usecase';
import { ListNewEntitysUsecase } from '@/new-entity/application/usecases/list-new-entity.usecase';
import { UpdateNewEntityUsecase } from '@/new-entity/application/usecases/update-new-entity.usecase';
import { DeleteNewEntityUsecase } from '@/new-entity/application/usecases/delete-new-entity.usecase';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NewEntityPrismaRepository } from '@/new-entity/infrastructure/database/prisma/repositories/new-entity-prisma.repository';
import { AuthModule } from '@/auth/infrastructure/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [NewEntityController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'NewEntityRepository',
      useFactory: (prismaService: PrismaService) => {
        return new NewEntityPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: GetNewEntityUsecase.UseCase,
      useFactory: (new-entityRepository: NewEntityRepository.Repository) => {
        return new GetNewEntityUsecase.UseCase(new-entityRepository);
      },
      inject: ['NewEntityRepository'],
    },
    {
      provide: ListNewEntitysUsecase.UseCase,
      useFactory: (new-entityRepository: NewEntityRepository.Repository) => {
        return new ListNewEntitysUsecase.UseCase(new-entityRepository);
      },
      inject: ['NewEntityRepository'],
    },
    {
      provide: UpdateNewEntityUsecase.UseCase,
      useFactory: (new-entityRepository: NewEntityRepository.Repository) => {
        return new UpdateNewEntityUsecase.UseCase(new-entityRepository);
      },
      inject: ['NewEntityRepository'],
    },
    {
      provide: DeleteNewEntityUsecase.UseCase,
      useFactory: (new-entityRepository: NewEntityRepository.Repository) => {
        return new DeleteNewEntityUsecase.UseCase(new-entityRepository);
      },
      inject: ['NewEntityRepository'],
    },
  ],
})

export class NewEntityModule {}
