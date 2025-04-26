import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Discipline } from '@prisma/client';
import { DisciplineModelMapper } from '@/discipline/infrastructure/database/prisma/models/discipline-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';

describe('Discipline model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();
    
    prismaService = new PrismaService();
    props = DisciplineDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(() => {
    prismaService.discipline.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when discipline model is invalid', () => {
    const model: Discipline = Object.assign({}, props, { name: null });

    expect(() => DisciplineModelMapper.toEntity(model)).toThrow(
      new ValidationErrors('Could not load discipline having id undefined'),
    );
  });

  it('should map discipline model to entity', async () => {
    const model: Discipline = await prismaService.discipline.create({
      data: props,
    });

    const sut = DisciplineModelMapper.toEntity(model);

    expect(sut).toBeInstanceOf(DisciplineEntity);

  });
});
