import { ClassroomInMemoryRepository } from '@/classroom/infrastructure/database/in-memory/repositories/classroom-in-memory.repository';
import { GetClassroomUsecase } from '@/classroom/application/usecases/get-classroom.usecase';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found-error';

describe('Get classroom use case test', () => {
  let sut: GetClassroomUsecase.UseCase;
  let repository: ClassroomInMemoryRepository;

  beforeEach(() => {
    repository = new ClassroomInMemoryRepository();
    sut = new GetClassroomUsecase.UseCase(repository);
  });

  it('should throw ClassroomWithEmailNotFoundError if classroom does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
      new ClassroomWithIdNotFoundError(input.id),
    );
  });

  it('should return classroom details if classroom exists', async () => {
    const classroom = ClassroomEntity.fake().aCADClassroom().build();
    await repository.insert(classroom);

    const input = { id: classroom.id };

    const result = await sut.execute(input);

    expect(result).toStrictEqual(classroom.toJSON());
  });

  it('should call repository findById with correct ID', async () => {
    const classroom = ClassroomEntity.fake().aCADClassroom().build();
    await repository.insert(classroom);

    const spyFindById = jest.spyOn(repository, 'findById');

    const input = { id: classroom.id };

    await sut.execute(input);

    expect(spyFindById).toHaveBeenCalledWith(classroom.id);
  });
});
