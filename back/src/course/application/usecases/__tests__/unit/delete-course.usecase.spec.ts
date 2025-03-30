import {
  CourseInMemoryRepository,
} from '@/course/infrastructure/database/in-memory/repositories/course-in-memory.repository';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { DeleteCourseUsecase } from '@/course/application/usecases/delete-course.usecase';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Delete course use case test', () => {
  let sut: DeleteCourseUsecase.UseCase;
  let repository: CourseInMemoryRepository;

  beforeEach(() => {
    repository = new CourseInMemoryRepository();
    sut = new DeleteCourseUsecase.UseCase(repository);
  });

  it('should throw exception if course does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
    );
  });


  it('should call repository delete with correct ID', async () => {
    const course = new CourseEntity(CourseDataBuilder({}));
    await repository.insert(course);

    const spyDelete = jest.spyOn(repository, 'delete');

    const input = { id: course.id };

    expect(repository.items).toHaveLength(1)
    await sut.execute(input);

    expect(spyDelete).toHaveBeenCalledWith(course.id);

    expect(repository.items).toHaveLength(0)
  });
});
