import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';
import {
  CourseInMemoryRepository,
} from '@/course/infrastructure/database/in-memory/repositories/course-in-memory.repository';
import { CourseRepository } from '@/course/domain/repositories/course.repository';
import { CourseEntity, CourseProps } from '@/course/domain/entities/course.entity';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';


describe('List courses use cases unit tests', () => {
  function createCourseEntity(courseProps: Partial<CourseProps> = {}) {
    return new CourseEntity(CourseDataBuilder(courseProps));
  }

  let sut: ListCoursesUsecase.UseCase;
  let repository: CourseInMemoryRepository;

  beforeEach(() => {
    repository = new CourseInMemoryRepository();
    sut = new ListCoursesUsecase.UseCase(repository);
  });

  describe('test to output', () => {
    it('should return empty result in output', () => {
      const result = new CourseRepository.SearchResult({
        items: [],
        total: 1,
        currentPage: 1,
        perPage: 1,
        sort: null,
        sortDir: null,
        filter: null,
      });

      const output = sut['toOutput'](result);

      expect(output).toStrictEqual({
        items: [],
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
      });
    });

    it('should return course entity result in output', () => {
      const entity = new CourseEntity(CourseDataBuilder({}));
      const result = new CourseRepository.SearchResult({
        items: [entity],
        total: 1,
        currentPage: 1,
        perPage: 1,
        sort: null,
        sortDir: null,
        filter: null,
      });

      const output = sut['toOutput'](result);

      expect(output).toStrictEqual({
        items: [entity.toJSON()],
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
      });
    });
  });

  it('should return sorted by created at by default', async () => {
    const initialDate = new Date();
    const courses = [
      createCourseEntity({ createdAt: initialDate }),
      createCourseEntity({ createdAt: new Date(initialDate.getTime() + 1) }),
      createCourseEntity({ createdAt: new Date(initialDate.getTime() + 2) }),
    ];
    repository.items = courses;

    const result = await sut.execute({});

    expect(result.total).toBe(courses.length);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(1);
    expect(result.perPage).toBe(10);

    expect(result.items[0].createdAt.getTime()).toStrictEqual(
      initialDate.getTime() + 2,
    );

    expect(result.items[1].createdAt.getTime()).toStrictEqual(
      initialDate.getTime() + 1,
    );
    expect(result.items[2].createdAt.getTime()).toStrictEqual(
      initialDate.getTime(),
    );
  });

  it('should return courses filtered, paginated and sorted', async () => {
    const courses = [
      createCourseEntity({ name: 'a' }),
      createCourseEntity({ name: 'A' }),
      createCourseEntity({ name: 'b' }),
      createCourseEntity({ name: 'c' }),
    ];
    repository.items = courses;

    const result = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'a',
    });

    expect(result.total).toBe(2);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(1);
    expect(result.perPage).toBe(2);

    expect(result.items[0].name).toBe('A');
    expect(result.items[1].name).toBe('a');
  });

  it('should return second page when empty in pagination', async () => {
    const courses = [
      createCourseEntity({ name: 'a' }),
      createCourseEntity({ name: 'A' }),
      createCourseEntity({ name: 'bb' }),
      createCourseEntity({ name: 'c' }),
    ];

    repository.items = courses;

    const result = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'a',
    });

    expect(result.items.length).toBe(0);
    expect(result.total).toBe(2);
    expect(result.currentPage).toBe(2);
    expect(result.lastPage).toBe(1);
    expect(result.perPage).toBe(2);
  });

  it('should return items in second page when having them', async () => {
    const courses = [
      createCourseEntity({ name: 'a' }),
      createCourseEntity({ name: 'A' }),
      createCourseEntity({ name: 'Aa' }),
      createCourseEntity({ name: 'c' }),
    ];
    repository.items = courses;

    const result = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'a',
    });

    expect(result.items.length).toBe(1);
    expect(result.total).toBe(3);
    expect(result.currentPage).toBe(2);
    expect(result.lastPage).toBe(2);
    expect(result.perPage).toBe(2);

    expect(result.items[0].name).toBe('a');
  });

  it('should return empty result when no filter found', async () => {
    const courses = [
      createCourseEntity({ name: 'a' }),
      createCourseEntity({ name: 'A' }),
      createCourseEntity({ name: 'b' }),
      createCourseEntity({ name: 'c' }),
    ];
    repository.items = courses;

    const result = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'd',
    });

    expect(result.items.length).toBe(0);
    expect(result.total).toBe(0);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(0);
    expect(result.perPage).toBe(2);
  });
});
