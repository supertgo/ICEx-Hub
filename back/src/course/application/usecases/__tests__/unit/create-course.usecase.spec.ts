import { CourseInMemoryRepository } from '@/course/infrastructure/database/in-memory/repositories/course-in-memory.repository';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CreateCourseUsecase } from '@/course/application/usecases/create-course.usecase';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
 
describe('CreateCourse use case unit tests', () => {
  let sut: CreateCourseUsecase.UseCase;
  let repository: CourseInMemoryRepository;
 
  beforeEach(() => {
    repository = new CourseInMemoryRepository();
    sut = new CreateCourseUsecase.UseCase(repository);
  });
 
  it('should create a course and return the output', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const input = { name: 'Ciência da Computação', code: 'CC001' };
 
    const output = await sut.execute(input);
 
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toBeDefined();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.code).toBe(input.code);
    expect(output.createdAt).toBeInstanceOf(Date);
  });
 
  it('should persist the course in the repository', async () => {
    const input = CourseDataBuilder({});
 
    expect(repository.items).toHaveLength(0);
 
    await sut.execute(input);
 
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0].name).toBe(input.name);
    expect(repository.items[0].code).toBe(input.code);
  });
 
  it('should throw if name is missing', async () => {
    const input = { name: '', code: 'CC001' };
 
    await expect(sut.execute(input)).rejects.toThrow();
  });
 
  it('should throw if code is missing', async () => {
    const input = { name: 'Ciência da Computação', code: '' };
 
    await expect(sut.execute(input)).rejects.toThrow();
  });
 
  it('should create multiple courses independently', async () => {
    const input1 = { name: 'Curso A', code: 'CA001' };
    const input2 = { name: 'Curso B', code: 'CB002' };
 
    const output1 = await sut.execute(input1);
    const output2 = await sut.execute(input2);
 
    expect(output1.id).not.toBe(output2.id);
    expect(repository.items).toHaveLength(2);
  });
 
  it('should call repository insert with a CourseEntity instance', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const input = { name: 'Engenharia de Software', code: 'ES100' };
 
    await sut.execute(input);
 
    const calledWith = spyInsert.mock.calls[0][0];
    expect(calledWith).toBeInstanceOf(CourseEntity);
    expect(calledWith.name).toBe(input.name);
    expect(calledWith.code).toBe(input.code);
  });
});