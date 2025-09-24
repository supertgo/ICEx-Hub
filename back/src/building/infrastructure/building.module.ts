import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import { GetBuildingUsecase } from '@/building/application/usecases/get-building.usecase';
import { ListBuildingsUsecase } from '@/building/application/usecases/list-building.usecase';
import { UpdateBuildingUsecase } from '@/building/application/usecases/update-building.usecase';
import { DeleteBuildingUsecase } from '@/building/application/usecases/delete-building.usecase';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { BuildingPrismaRepository } from '@/building/infrastructure/database/prisma/repositories/building-prisma.repository';
import { AuthModule } from '@/auth/infrastructure/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BuildingController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'BuildingRepository',
      useFactory: (prismaService: PrismaService) => {
        return new BuildingPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: GetBuildingUsecase.UseCase,
      useFactory: (buildingRepository: BuildingRepository.Repository) => {
        return new GetBuildingUsecase.UseCase(buildingRepository);
      },
      inject: ['BuildingRepository'],
    },
    {
      provide: ListBuildingsUsecase.UseCase,
      useFactory: (buildingRepository: BuildingRepository.Repository) => {
        return new ListBuildingsUsecase.UseCase(buildingRepository);
      },
      inject: ['BuildingRepository'],
    },
    {
      provide: UpdateBuildingUsecase.UseCase,
      useFactory: (buildingRepository: BuildingRepository.Repository) => {
        return new UpdateBuildingUsecase.UseCase(buildingRepository);
      },
      inject: ['BuildingRepository'],
    },
    {
      provide: DeleteBuildingUsecase.UseCase,
      useFactory: (buildingRepository: BuildingRepository.Repository) => {
        return new DeleteBuildingUsecase.UseCase(buildingRepository);
      },
      inject: ['BuildingRepository'],
    },
  ],
})

export class BuildingModule {}
