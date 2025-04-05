import {
  CourseInMemoryRepository,
} from '@/course/infrastructure/database/in-memory/repositories/course-in-memory.repository';
import { GetCourseUsecase } from '@/course/application/usecases/get-course.usecase';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CourseWithIdNotFoundError } from '@/course/infrastructure/errors/course-with-id-not-found-error';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Get course use case test', () => {
  let sut: GetCourseUsecase.UseCase;
  let repository: CourseInMemoryRepository;

  beforeEach(() => {
    repository = new CourseInMemoryRepository();
    sut = new GetCourseUsecase.UseCase(repository);
  });

  it('should throw CourseWithEmailNotFoundError if course does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
      new CourseWithIdNotFoundError(input.id),
    );
  });

  it('should return course details if course exists', async () => {
    const course = new CourseEntity(CourseDataBuilder({}));
    await repository.insert(course);

    const input = { id: course.id };

    const result = await sut.execute(input);

    expect(result).toStrictEqual(course.toJSON());
  });

  it('should call repository findById with correct ID', async () => {
    const course = new CourseEntity(CourseDataBuilder({}));
    await repository.insert(course);

    const spyFindById = jest.spyOn(repository, 'findById');

    const input = { id: course.id };

    await sut.execute(input);

    expect(spyFindById).toHaveBeenCalledWith(course.id);
  });
});
