import {
  BuildingValidator,
  BuildingValidatorFactory,
} from '../../building.validator';

let sut: BuildingValidator;

describe('BuildingValidatorFields Unit Tests', () => {
  beforeEach(() => {
    sut = BuildingValidatorFactory.create();
  });

  it('should validate without data', () => {
    const isValid = sut.validate(null);

    expect(isValid).toBeFalsy();
    expect(sut.errors).toBeDefined();
  });
});
