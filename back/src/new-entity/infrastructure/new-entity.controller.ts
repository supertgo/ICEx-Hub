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
import { UpdateNewEntityUsecase } from '@/new-entity/application/usecases/update-new-entity.usecase';
import { GetNewEntityUsecase } from '@/new-entity/application/usecases/get-new-entity.usecase';
import { ListNewEntitysUsecase } from '@/new-entity/application/usecases/list-new-entitys.usecase';
import { DeleteNewEntityUsecase } from '@/new-entity/application/usecases/delete-new-entity.usecase';
import { ListNewEntitysDto } from '@/new-entity/infrastructure/dtos/list-new-entitys.dto';
import { UpdateNewEntityDto } from '@/new-entity/infrastructure/dtos/update-new-entity.dto';
import { NewEntityOutput } from '@/new-entity/application/dtos/new-entity-output';
import {
  NewEntityCollectionPresenter,
  NewEntityPresenter,
} from '@/new-entity/infrastructure/presenters/new-entity.presenter';
import { AuthService } from '@/auth/infrastructure/auth.service';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('new-entity')
@Controller('new-entity')
export class NewEntityController {
  @Inject(UpdateNewEntityUsecase.UseCase)
  private updateNewEntityUseCase: UpdateNewEntityUsecase.UseCase;

  @Inject(GetNewEntityUsecase.UseCase)
  private getNewEntityUseCase: GetNewEntityUsecase.UseCase;

  @Inject(ListNewEntitysUsecase.UseCase)
  private listNewEntitysUseCase: ListNewEntitysUsecase.UseCase;

  @Inject(DeleteNewEntityUsecase.UseCase)
  private deleteNewEntityUseCase: DeleteNewEntityUsecase.UseCase;

  @Inject(AuthService)
  private authService: AuthService;

  static new-entityToResponse(output: NewEntityOutput): NewEntityPresenter {
    return new NewEntityPresenter(output);
  }

  static listNewEntityToResponse(
    output: ListNewEntitysUsecase.Output,
  ): NewEntityCollectionPresenter {
    return new NewEntityCollectionPresenter(output);
  }

  @ApiOkResponse({
    description: 'The NewEntity has been successfully created.',
    type: NewEntityCollectionPresenter,
  })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get()
  async search(@Query() searchParams: ListNewEntitysDto) {
    const result = await this.listNewEntitysUseCase.execute(searchParams);

    return NewEntityController.listNewEntityToResponse(result);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'NewEntity not found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getNewEntityUseCase.execute({ id });

    return NewEntityController.new-entityToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 404, description: 'NewEntity not found' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNewEntityDto: UpdateNewEntityDto) {
    const output = await this.updateNewEntityUseCase.execute({
      id,
      ...updateNewEntityDto,
    });

    return NewEntityController.new-entityToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'NewEntity not found' })
  @ApiResponse({ status: 204, description: 'NewEntity deleted' })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteNewEntityUseCase.execute({ id });
  }
}
