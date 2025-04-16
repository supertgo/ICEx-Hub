import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListCoursePeriodUsecase } from '@/course/application/usecases/list-course-period.usecase';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ListCoursePeriodsDto } from './dtos/list-course-period.dto';
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

  @ApiOkResponse({
    description: 'Paginated list of course periods',
    type: CoursePeriodCollectionPresenter,
  })
  @ApiExtraModels(CoursePeriodPresenter, CoursePeriodCollectionPresenter)
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @Get()
  async search(@Query() searchParams: ListCoursePeriodsDto) {
    const result = await this.listCoursePeriodUseCase.execute({
      ...searchParams,
      filter: {
        name: searchParams?.name,
        courseId: searchParams?.courseId,
      },
    });

    return CoursePeriodController.listCoursePeriodToResponse(result);
  }
}
