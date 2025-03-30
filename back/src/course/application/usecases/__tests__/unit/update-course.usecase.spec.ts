import {
  CourseInMemoryRepository,
} from '@/course/infrastructure/database/in-memory/repositories/course-in-memory.repository';
import { UpdateCourseUsecase } from '@/course/application/usecases/update-course.usecase';

describe('Update course use case test', () => {
  let sut: UpdateCourseUsecase.UseCase;
  let repository: CourseInMemoryRepository;

  beforeEach(() => {
    repository = new CourseInMemoryRepository();
    sut = new UpdateCourseUsecase.UseCase(repository);
  });
  //todo Laura
  it.todo('should throw courseWithIdNotFoundError if course does not exist', async () => {});
});
