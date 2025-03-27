import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UpdateCourseUsecase } from '@/course/application/usecases/update-course.usecase';
import { GetCourseUsecase } from '@/course/application/usecases/get-course.usecase';
import { DeleteCourseUsecase } from '@/course/application/usecases/delete-course.usecase';
import { CourseOutput } from '@/course/application/dtos/course-output';
import { CourseCollectionPresenter, CoursePresenter } from '@/course/infrastructure/presenters/course.presenter';
import { AuthService } from '@/auth/infrastructure/auth.service';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';

@ApiTags('course')
@Controller('course')
export class CourseController {
  @Inject(UpdateCourseUsecase.UseCase)
  private updateCourseUseCase: UpdateCourseUsecase.UseCase;

  @Inject(GetCourseUsecase.UseCase)
  private getCourseUseCase: GetCourseUsecase.UseCase;

  @Inject(ListCoursesUsecase.UseCase)
  private listCoursesUseCase: ListCoursesUsecase.UseCase;

  @Inject(DeleteCourseUsecase.UseCase)
  private deleteCourseUseCase: DeleteCourseUsecase.UseCase;

  @Inject(AuthService)
  private authService: AuthService;

  static courseToResponse(output: CourseOutput): CoursePresenter {
    return new CoursePresenter(output);
  }

  static listCourseToResponse(
    output: ListCoursesUsecase.Output,
  ): CourseCollectionPresenter {
    return new CourseCollectionPresenter(output);
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
          items: { $ref: getSchemaPath(CoursePresenter) },
        },
      },
    },
  })

  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get()
  async search(@Query() searchParams: ListCoursesDto) {
    const result = await this.listCoursesUseCase.execute(searchParams);

    return CourseController.listCourseToResponse(result);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getCourseUseCase.execute({ id });

    return CourseController.courseToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const output = await this.updateCourseUseCase.execute({
      id,
      ...updateCourseDto,
    });

    return CourseController.courseToResponse(output);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 204, description: 'Course deleted' })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteCourseUseCase.execute({ id });
  }
}
