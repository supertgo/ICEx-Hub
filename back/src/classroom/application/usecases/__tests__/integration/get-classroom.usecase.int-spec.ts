import { PrismaClient } from '@prisma/client';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/classroom-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { GetClassroomUsecase } from '@/classroom/application/usecases/get-classroom.usecase';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';

describe('Get classroom usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: ClassroomPrismaRepository;
  let sut: GetClassroomUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new ClassroomPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new GetClassroomUsecase.UseCase(repository);
    await prismaService.classroom.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when classroom not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrowError(
      new ClassroomWithIdNotFoundError(id),
    );
  });

  it('should retrieve a classroom', async () => {
    const entity = ClassroomEntity.fake().aIcexClassroom().build();
    const classroom = await prismaService.classroom.create({
      data: entity,
    });

    const output = await sut.execute({ id: classroom.id });

    expect(output).toBeDefined();
    expect(output).toMatchObject(classroom);
  });
});
