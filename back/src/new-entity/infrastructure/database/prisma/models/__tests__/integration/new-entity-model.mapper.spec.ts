import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NewEntity } from '@prisma/client';
import { NewEntityModelMapper } from '@/new-entity/infrastructure/database/prisma/models/new-entity-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';

describe('NewEntity model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();
    
    prismaService = new PrismaService();
    props = NewEntityDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(() => {
    prismaService.new-entity.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when new-entity model is invalid', () => {
    const model: NewEntity = Object.assign({}, props, { name: null });

    expect(() => NewEntityModelMapper.toEntity(model)).toThrow(
      new ValidationErrors('Could not load new-entity having id undefined'),
    );
  });

  it('should map new-entity model to entity', async () => {
    const model: NewEntity = await prismaService.new-entity.create({
      data: props,
    });

    const sut = NewEntityModelMapper.toEntity(model);

    expect(sut).toBeInstanceOf(NewEntityEntity);

  });
});
