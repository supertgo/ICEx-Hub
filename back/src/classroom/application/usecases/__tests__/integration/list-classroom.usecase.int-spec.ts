import { PrismaClient } from '@prisma/client';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/classroom-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ListClassroomsUsecase } from '@/classroom/application/usecases/list-classroom.usecase';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

describe('List classrooms usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: ClassroomPrismaRepository;
  let sut: ListClassroomsUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new ClassroomPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListClassroomsUsecase.UseCase(repository);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should retrieve users orderedBy createdAt as default', async () => {
    const entities = ClassroomEntity.fake().theClassroomEntitys(11).build();

    await prismaService.classroom.createMany({
      data: entities,
    });

    const output = await sut.execute({});

    expect(output).not.toBeNull();
    expect(output.items).toHaveLength(10);
    expect(output.total).toBe(11);
    expect(output.currentPage).toBe(1);
    expect(output.lastPage).toBe(2);
  });

  it('should returns output using filter, sort and paginate', async () => {
    const createdAt = new Date();
    const entities = [
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(createdAt)
        .withName('test')
        .build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(createdAt.getTime() + 1))
        .withName('a')
        .build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(createdAt.getTime() + 2))
        .withName('TEST')
        .build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(createdAt.getTime() + 3))
        .withName('b')
        .build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(createdAt.getTime() + 4))
        .withName('TeSt')
        .build(),
    ];

    await prismaService.classroom.createMany({ data: entities });

    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'TEST',
    });

    expect(output).toMatchObject({
      items: [entities[0].toJSON(), entities[4].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'TEST',
    });

    expect(output).toMatchObject({
      items: [entities[2].toJSON()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2,
    });
  });
});
