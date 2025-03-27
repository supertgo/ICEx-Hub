import { CourseOutput } from '@/course/application/dtos/course-output';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';

export class CoursePresenter {
  constructor(output: CourseOutput) { }
}

export class CourseCollectionPresenter extends CollectionPresenter {
  data: CoursePresenter[];

  constructor(output: ListCoursesUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new CoursePresenter(item));
  }
}
