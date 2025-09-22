import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateBuildingUsecase } from '@/building/application/usecases/update-building.usecase';
import { GetBuildingUsecase } from '@/building/application/usecases/get-building.usecase';
import { ListBuildingsUsecase } from '@/building/application/usecases/list-buildings.usecase';
import { DeleteBuildingUsecase } from '@/building/application/usecases/delete-building.usecase';
import { ListBuildingsDto } from '@/building/infrastructure/dtos/list-buildings.dto';
import { UpdateBuildingDto } from '@/building/infrastructure/dtos/update-building.dto';
import { BuildingOutput } from '@/building/application/dtos/building-output';
import {
  BuildingCollectionPresenter,
  BuildingPresenter,
} from '@/building/infrastructure/presenters/building.presenter';
import { AuthService } from '@/auth/infrastructure/auth.service';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('building')
@Controller('building')
export class BuildingController {
  @Inject(UpdateBuildingUsecase.UseCase)
  private updateBuildingUseCase: UpdateBuildingUsecase.UseCase;

  @Inject(GetBuildingUsecase.UseCase)
  private getBuildingUseCase: GetBuildingUsecase.UseCase;

  @Inject(ListBuildingsUsecase.UseCase)
  private listBuildingsUseCase: ListBuildingsUsecase.UseCase;

  @Inject(DeleteBuildingUsecase.UseCase)
  private deleteBuildingUseCase: DeleteBuildingUsecase.UseCase;

  @Inject(AuthService)
  private authService: AuthService;

  static buildingToResponse(output: BuildingOutput): BuildingPresenter {
    return new BuildingPresenter(output);
  }

  static listBuildingToResponse(
    output: ListBuildingsUsecase.Output,
  ): BuildingCollectionPresenter {
    return new BuildingCollectionPresenter(output);
  }

  @ApiOkResponse({
    description: 'The Building has been successfully created.',
    type: BuildingCollectionPresenter,
  })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get()
  async search(@Query() searchParams: ListBuildingsDto) {
    const result = await this.listBuildingsUseCase.execute(searchParams);

    return BuildingController.listBuildingToResponse(result);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Building not found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getBuildingUseCase.execute({ id });

    return BuildingController.buildingToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 404, description: 'Building not found' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    const output = await this.updateBuildingUseCase.execute({
      id,
      ...updateBuildingDto,
    });

    return BuildingController.buildingToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Building not found' })
  @ApiResponse({ status: 204, description: 'Building deleted' })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteBuildingUseCase.execute({ id });
  }
}
