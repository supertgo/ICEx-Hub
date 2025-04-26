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
import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';
import { GetDisciplineUsecase } from '@/discipline/application/usecases/get-discipline.usecase';
import { ListDisciplinesUsecase } from '@/discipline/application/usecases/list-disciplines.usecase';
import { DeleteDisciplineUsecase } from '@/discipline/application/usecases/delete-discipline.usecase';
import { ListDisciplinesDto } from '@/discipline/infrastructure/dtos/list-disciplines.dto';
import { UpdateDisciplineDto } from '@/discipline/infrastructure/dtos/update-discipline.dto';
import { DisciplineOutput } from '@/discipline/application/dtos/discipline-output';
import {
  DisciplineCollectionPresenter,
  DisciplinePresenter,
} from '@/discipline/infrastructure/presenters/discipline.presenter';
import { AuthService } from '@/auth/infrastructure/auth.service';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('discipline')
@Controller('discipline')
export class DisciplineController {
  @Inject(UpdateDisciplineUsecase.UseCase)
  private updateDisciplineUseCase: UpdateDisciplineUsecase.UseCase;

  @Inject(GetDisciplineUsecase.UseCase)
  private getDisciplineUseCase: GetDisciplineUsecase.UseCase;

  @Inject(ListDisciplinesUsecase.UseCase)
  private listDisciplinesUseCase: ListDisciplinesUsecase.UseCase;

  @Inject(DeleteDisciplineUsecase.UseCase)
  private deleteDisciplineUseCase: DeleteDisciplineUsecase.UseCase;

  @Inject(AuthService)
  private authService: AuthService;

  static disciplineToResponse(output: DisciplineOutput): DisciplinePresenter {
    return new DisciplinePresenter(output);
  }

  static listDisciplineToResponse(
    output: ListDisciplinesUsecase.Output,
  ): DisciplineCollectionPresenter {
    return new DisciplineCollectionPresenter(output);
  }

  @ApiOkResponse({
    description: 'The Discipline has been successfully created.',
    type: DisciplineCollectionPresenter,
  })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get()
  async search(@Query() searchParams: ListDisciplinesDto) {
    const result = await this.listDisciplinesUseCase.execute(searchParams);

    return DisciplineController.listDisciplineToResponse(result);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Discipline not found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getDisciplineUseCase.execute({ id });

    return DisciplineController.disciplineToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 404, description: 'Discipline not found' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDisciplineDto: UpdateDisciplineDto) {
    const output = await this.updateDisciplineUseCase.execute({
      id,
      ...updateDisciplineDto,
    });

    return DisciplineController.disciplineToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Discipline not found' })
  @ApiResponse({ status: 204, description: 'Discipline deleted' })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteDisciplineUseCase.execute({ id });
  }
}
