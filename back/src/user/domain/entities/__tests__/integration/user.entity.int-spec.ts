import {
  UserDataBuilder,
  UserDataBuilderWithOptionalIds,
} from '@/user/domain/testing/helper/user-data-builder';
import { UserEntity, UserProps } from '@/user/domain/entities/user.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

describe('User entity integration tests', () => {
  describe('Constructor tests', () => {
    it('should throw error with invalid name', () => {
      const props = {
        ...UserDataBuilder({}),
        name: null,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('should throw error with invalid email', () => {
      const props = {
        ...UserDataBuilder({}),
        email: null,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('should throw error with invalid courseId', () => {
      const props = {
        ...UserDataBuilder({}),
        courseId: {} as any,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('should throw error with invalid coursePeriodId', () => {
      const props = {
        ...UserDataBuilder({}),
        coursePeriodId: {} as any,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('should throw error with invalid password', () => {
      const props = {
        ...UserDataBuilder({}),
        password: null,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('should create user with valid data', () => {
      const props = UserDataBuilder({});
      const sut = new UserEntity(props);

      commonUserEntityValidation(sut, props);
    });
  });

  function commonUserEntityValidation(sut: UserEntity, props: UserProps) {
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(UserEntity);
    expect(sut.name).toBe(props.name);
    expect(sut.email).toBe(props.email);
    expect(sut.password).toBe(props.password);
    expect(sut.createdAt).toBe(props.createdAt);
  }

  it('should create user with valid data and optionalParameters', () => {
    const props = UserDataBuilderWithOptionalIds({});
    const sut = new UserEntity(props);

    commonUserEntityValidation(sut, props);

    expect(sut.courseId).toBe(props.courseId);
    expect(sut.coursePeriodId).toBe(props.coursePeriodId);
  });

  describe('update tests', () => {
    it('should throw error with invalid name', () => {
      const sut = new UserEntity(UserDataBuilder({}));
      expect(() => sut.update(null)).toThrow(EntityValidationError);
    });

    it('should update name with valid data', () => {
      const sut = new UserEntity(UserDataBuilder({}));
      const value = 'new name';
      sut.update(value);

      expect(sut.name).toBe(value);
    });

    it('should throw error with invalid password', () => {
      const sut = new UserEntity(UserDataBuilder({}));
      expect(() => sut.updatePassword(null)).toThrow(EntityValidationError);
    });

    it('should update password with valid data', () => {
      const sut = new UserEntity(UserDataBuilder({}));
      const value = 'new password';
      sut.updatePassword(value);

      expect(sut.password).toBe(value);
    });
  });
});
