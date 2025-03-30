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
import { UpdateScheduleUsecase } from '@/schedule/application/usecases/update-schedule.usecase';
import { GetScheduleUsecase } from '@/schedule/application/usecases/get-schedule.usecase';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedules.usecase';
import { DeleteScheduleUsecase } from '@/schedule/application/usecases/delete-schedule.usecase';
import { ListSchedulesDto } from '@/schedule/infrastructure/dtos/list-schedules.dto';
import { UpdateScheduleDto } from '@/schedule/infrastructure/dtos/update-schedule.dto';
import { ScheduleOutput } from '@/schedule/application/dtos/schedule-output';
import {
  ScheduleCollectionPresenter,
  SchedulePresenter,
} from '@/schedule/infrastructure/presenters/schedule.presenter';
import { AuthService } from '@/auth/infrastructure/auth.service';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  @Inject(UpdateScheduleUsecase.UseCase)
  private updateScheduleUseCase: UpdateScheduleUsecase.UseCase;

  @Inject(GetScheduleUsecase.UseCase)
  private getScheduleUseCase: GetScheduleUsecase.UseCase;

  @Inject(ListSchedulesUsecase.UseCase)
  private listSchedulesUseCase: ListSchedulesUsecase.UseCase;

  @Inject(DeleteScheduleUsecase.UseCase)
  private deleteScheduleUseCase: DeleteScheduleUsecase.UseCase;

  @Inject(AuthService)
  private authService: AuthService;

  static scheduleToResponse(output: ScheduleOutput): SchedulePresenter {
    return new SchedulePresenter(output);
  }

  static listScheduleToResponse(
    output: ListSchedulesUsecase.Output,
  ): ScheduleCollectionPresenter {
    return new ScheduleCollectionPresenter(output);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        meta: {
          type: 'object',
          properties: {
            totalItems: { type: 'number' },
            itemCount: { type: 'number' },
            itemsPerPage: { type: 'number' },
            totalPages: { type: 'number' },
            currentPage: { type: 'number' },
          },
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(SchedulePresenter) },
        },
      },
    },
  })

  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get()
  async search(@Query() searchParams: ListSchedulesDto) {
    const result = await this.listSchedulesUseCase.execute(searchParams);

    return ScheduleController.listScheduleToResponse(result);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getScheduleUseCase.execute({ id });

    return ScheduleController.scheduleToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    const output = await this.updateScheduleUseCase.execute({
      id,
      ...updateScheduleDto,
    });

    return ScheduleController.scheduleToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  @ApiResponse({ status: 204, description: 'Schedule deleted' })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteScheduleUseCase.execute({ id });
  }
}
