import { PrismaClient } from '@prisma/client';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/classroom-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found';
import { UpdateClassroomUsecase } from '../../update-classroom.usecase';
import { faker } from '@faker-js/faker';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';

describe('Update classroom usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: ClassroomPrismaRepository;
  let sut: UpdateClassroomUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new ClassroomPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new UpdateClassroomUsecase.UseCase(repository);
    await prismaService.classroom.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when classroom not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrow(
      new ClassroomWithIdNotFoundError(id),
    );
  });

  it('should update a classroom', async () => {
    const entity = ClassroomEntity.fake().aIcexClassroom().build();
    const classroom = await prismaService.classroom.create({
      data: entity,
    });

    const output = await sut.execute({
      id: classroom.id,
      name: classroom.name,
      building: classroom.building,
    });

    expect(output).toBeDefined();
    expect(output).toMatchObject(classroom);
  });
});
