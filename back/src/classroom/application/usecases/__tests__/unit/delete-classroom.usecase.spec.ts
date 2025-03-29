import { ClassroomInMemoryRepository } from '@/classroom/infrastructure/database/in-memory/repositories/classroom-in-memory.repository';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { DeleteClassroomUsecase } from '@/classroom/application/usecases/delete-classroom.usecase';

describe('Delete classroom use case test', () => {
  let sut: DeleteClassroomUsecase.UseCase;
  let repository: ClassroomInMemoryRepository;

  beforeEach(() => {
    repository = new ClassroomInMemoryRepository();
    sut = new DeleteClassroomUsecase.UseCase(repository);
  });

  it('should throw exception if classroom does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow();
  });

  it('should call repository delete with correct ID', async () => {
    const classroom = ClassroomEntity.fake().aCADClassroom().build();
    await repository.insert(classroom);

    const spyDelete = jest.spyOn(repository, 'delete');

    const input = { id: classroom.id };

    expect(repository.items).toHaveLength(1);
    await sut.execute(input);

    expect(spyDelete).toHaveBeenCalledWith(classroom.id);

    expect(repository.items).toHaveLength(0);
  });
});
