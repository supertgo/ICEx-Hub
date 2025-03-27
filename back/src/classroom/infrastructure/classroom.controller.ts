import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateClassroomUsecase } from '@/classroom/application/usecases/update-classroom.usecase';
import { GetClassroomUsecase } from '@/classroom/application/usecases/get-classroom.usecase';
import { ListClassroomsUsecase } from '@/classroom/application/usecases/list-classroom.usecase';
import { DeleteClassroomUsecase } from '@/classroom/application/usecases/delete-classroom.usecase';
import { ListClassroomsDto } from '@/classroom/infrastructure/dtos/list-classroom.dto';
import { UpdateClassroomDto } from '@/classroom/infrastructure/dtos/update-classroom.dto';
import { ClassroomOutput } from '@/classroom/application/dtos/classroom-output';
import {
  ClassroomCollectionPresenter,
  ClassroomPresenter,
} from '@/classroom/infrastructure/presenters/classroom.presenter';
import { AuthService } from '@/auth/infrastructure/auth.service';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('classroom')
@Controller('classroom')
export class ClassroomController {
  @Inject(UpdateClassroomUsecase.UseCase)
  private updateClassroomUseCase: UpdateClassroomUsecase.UseCase;

  @Inject(GetClassroomUsecase.UseCase)
  private getClassroomUseCase: GetClassroomUsecase.UseCase;

  @Inject(ListClassroomsUsecase.UseCase)
  private listClassroomsUseCase: ListClassroomsUsecase.UseCase;

  @Inject(DeleteClassroomUsecase.UseCase)
  private deleteClassroomUseCase: DeleteClassroomUsecase.UseCase;

  @Inject(AuthService)
  private authService: AuthService;

  static classroomToResponse(output: ClassroomOutput): ClassroomPresenter {
    return new ClassroomPresenter(output);
  }

  static listClassroomToResponse(
    output: ListClassroomsUsecase.Output,
  ): ClassroomCollectionPresenter {
    return new ClassroomCollectionPresenter(output);
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
            totalItems: { type: 'string' },
            itemCount: { type: 'number' },
            itemsPerPage: { type: 'number' },
            totalPages: { type: 'number' },
            currentPage: { type: 'number' },
          },
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(ClassroomPresenter) },
        },
      },
    },
  })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get()
  async search(@Query() searchParams: ListClassroomsDto) {
    const result = await this.listClassroomsUseCase.execute(searchParams);

    return ClassroomController.listClassroomToResponse(result);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Classroom not found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getClassroomUseCase.execute({ id });

    return ClassroomController.classroomToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 404, description: 'Classroom not found' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    const output = await this.updateClassroomUseCase.execute({
      id,
      ...updateClassroomDto,
    });

    return ClassroomController.classroomToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Classroom not found' })
  @ApiResponse({ status: 204, description: 'Classroom deleted' })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteClassroomUseCase.execute({ id });
  }
}
