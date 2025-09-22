import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Building } from '@prisma/client';
import { BuildingModelMapper } from '@/building/infrastructure/database/prisma/models/building-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';

describe('Building model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();
    
    prismaService = new PrismaService();
    props = BuildingDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(() => {
    prismaService.building.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when building model is invalid', () => {
    const model: Building = Object.assign({}, props, { name: null });

    expect(() => BuildingModelMapper.toEntity(model)).toThrow(
      new ValidationErrors('Could not load building having id undefined'),
    );
  });

  it('should map building model to entity', async () => {
    const model: Building = await prismaService.building.create({
      data: props,
    });

    const sut = BuildingModelMapper.toEntity(model);

    expect(sut).toBeInstanceOf(BuildingEntity);

  });
});
