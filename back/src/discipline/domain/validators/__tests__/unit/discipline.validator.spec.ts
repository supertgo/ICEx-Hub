import {
  DisciplineValidator,
  DisciplineValidatorFactory,
} from '../../discipline.validator';

let sut: DisciplineValidator;

describe('DisciplineValidatorFields Unit Tests', () => {
  beforeEach(() => {
    sut = DisciplineValidatorFactory.create();
  });

  it('should validate without data', () => {
    const isValid = sut.validate(null);

    expect(isValid).toBeFalsy();
    expect(sut.errors).toBeDefined();
  });
});
