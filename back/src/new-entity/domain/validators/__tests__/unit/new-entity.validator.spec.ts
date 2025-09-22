import {
  NewEntityValidator,
  NewEntityValidatorFactory,
} from '../../new-entity.validator';

let sut: NewEntityValidator;

describe('NewEntityValidatorFields Unit Tests', () => {
  beforeEach(() => {
    sut = NewEntityValidatorFactory.create();
  });

  it('should validate without data', () => {
    const isValid = sut.validate(null);

    expect(isValid).toBeFalsy();
    expect(sut.errors).toBeDefined();
  });
});
