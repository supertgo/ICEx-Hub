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
import { UpdateCourseUsecase } from '@/course/application/usecases/update-course.usecase';
import { GetCourseUsecase } from '@/course/application/usecases/get-course.usecase';
import { DeleteCourseUsecase } from '@/course/application/usecases/delete-course.usecase';
import { CourseOutput } from '@/course/application/dtos/course-output';
import {
  CourseCollectionPresenter,
  CoursePresenter,
} from '@/course/infrastructure/presenters/course.presenter';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';
import { CreateCourseUsecase } from '@/course/application/usecases/create-course.usecase';
import { CreateCourseDto } from '@/course/infrastructure/dtos/create-course.dto';
import { ListCoursesDto } from '@/course/infrastructure/dtos/list-course.dto';

@ApiTags('course')
@Controller('course')
export class CourseController {
  @Inject(UpdateCourseUsecase.UseCase)
  private updateCourseUseCase: UpdateCourseUsecase.UseCase;

  @Inject(CreateCourseUsecase.UseCase)
  private createCourseUseCase: CreateCourseUsecase.UseCase;

  @Inject(GetCourseUsecase.UseCase)
  private getCourseUseCase: GetCourseUsecase.UseCase;

  @Inject(ListCoursesUsecase.UseCase)
  private listCoursesUseCase: ListCoursesUsecase.UseCase;

  @Inject(DeleteCourseUsecase.UseCase)
  private deleteCourseUseCase: DeleteCourseUsecase.UseCase;

  static courseToResponse(output: CourseOutput): CoursePresenter {
    return new CoursePresenter(output);
  }

  static listCourseToResponse(
    output: ListCoursesUsecase.Output,
  ): CourseCollectionPresenter {
    return new CourseCollectionPresenter(output);
  }

  @ApiOkResponse({
    description: 'The course has been successfully created.',
    type: CourseCollectionPresenter,
  })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async search(@Query() searchParams: ListCoursesDto) {
    const result = await this.listCoursesUseCase.execute(searchParams);

    return CourseController.listCourseToResponse(result);
  }

  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getCourseUseCase.execute({ id });

    return CourseController.courseToResponse(output);
  }

  //todo Laura
  // @ApiBearerAuth()
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  // @ApiResponse({ status: 404, description: 'Course not found' })
  // @UseGuards(AuthGuard)
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() courseDto: CreateCourseDto) {
  //   const output = await this.updateCourseUseCase.execute({
  //     id,
  //     ...courseDto,
  //   });
  //
  //   return CourseController.courseToResponse(output);
  // }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async create(@Param('id') id: string, @Body() courseDto: CreateCourseDto) {
    const output = await this.createCourseUseCase.execute(courseDto);

    return CourseController.courseToResponse(output);
  }

  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 204, description: 'Course deleted' })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteCourseUseCase.execute({ id });
  }
}
