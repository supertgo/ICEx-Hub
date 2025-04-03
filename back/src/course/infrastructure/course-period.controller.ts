import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ListCoursePeriodUsecase } from '@/course/application/usecases/list-course-period.usecase';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ListCoursesDto } from '@/course/infrastructure/dtos/list-course.dto';
import {
  CoursePeriodCollectionPresenter,
  CoursePeriodPresenter,
} from '@/course/infrastructure/presenters/course-period.presenter';

@ApiTags('course-period')
@Controller('course-period')
export class CoursePeriodController {
  @Inject(ListCoursePeriodUsecase.UseCase)
  private listCoursePeriodUseCase: ListCoursePeriodUsecase.UseCase;

  static listCoursePeriodToResponse(
    output: ListCoursePeriodUsecase.Output,
  ): CoursePeriodCollectionPresenter {
    return new CoursePeriodCollectionPresenter(output);
  }

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
          items: { $ref: getSchemaPath(CoursePeriodPresenter) },
        },
      },
    },
  })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async search(@Query() searchParams: ListCoursesDto) {
    const result = await this.listCoursePeriodUseCase.execute(searchParams);

    return CoursePeriodController.listCoursePeriodToResponse(result);
  }
}
