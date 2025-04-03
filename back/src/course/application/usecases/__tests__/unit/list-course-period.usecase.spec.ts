import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { CourseProps } from '@/course/domain/entities/course.entity';
import { ListCoursePeriodUsecase } from '@/course/application/usecases/list-course-period.usecase';
import { CoursePeriodInMemoryRepository } from '@/course/infrastructure/database/in-memory/repositories/course-period-in-memory.repository';
import { CoursePeriodRepository } from '@/course/domain/repositories/course-period.repository';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';

describe('List courses use cases unit tests', () => {
  function createCoursePeriodEntity(courseProps: Partial<CourseProps> = {}) {
    return new CoursePeriodEntity(CoursePeriodDataBuilder(courseProps));
  }

  let sut: ListCoursePeriodUsecase.UseCase;
  let repository: CoursePeriodInMemoryRepository;

  beforeEach(() => {
    repository = new CoursePeriodInMemoryRepository();
    sut = new ListCoursePeriodUsecase.UseCase(repository);
  });

  describe('test to output', () => {
    it('should return empty result in output', () => {
      const result = new CoursePeriodRepository.SearchResult({
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

    it('should return course period entity result in output', () => {
      const entity = new CoursePeriodEntity(CoursePeriodDataBuilder({}));
      const result = new CoursePeriodRepository.SearchResult({
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

  it('should return courses filtered, paginated and sorted', async () => {
    repository.items = [
      createCoursePeriodEntity({ name: 'a' }),
      createCoursePeriodEntity({ name: 'A' }),
      createCoursePeriodEntity({ name: 'b' }),
      createCoursePeriodEntity({ name: 'c' }),
    ];

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
    repository.items = [
      createCoursePeriodEntity({ name: 'a' }),
      createCoursePeriodEntity({ name: 'A' }),
      createCoursePeriodEntity({ name: 'bb' }),
      createCoursePeriodEntity({ name: 'c' }),
    ];

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
    repository.items = [
      createCoursePeriodEntity({ name: 'a' }),
      createCoursePeriodEntity({ name: 'A' }),
      createCoursePeriodEntity({ name: 'Aa' }),
      createCoursePeriodEntity({ name: 'c' }),
    ];

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
    repository.items = [
      createCoursePeriodEntity({ name: 'a' }),
      createCoursePeriodEntity({ name: 'A' }),
      createCoursePeriodEntity({ name: 'b' }),
      createCoursePeriodEntity({ name: 'c' }),
    ];

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
