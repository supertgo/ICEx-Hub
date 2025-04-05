import { SignupUsecase } from '@/user/application/usecases/sign-up.usecase';
import { UserInMemoryRepository } from '@/user/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BcryptjsHashProvider } from '@/user/infrastructure/providers/hash-provider/bcryptjs-hash.provider';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { CourseInMemoryRepository } from '@/course/infrastructure/database/in-memory/repositories/course-in-memory.repository';
import { CoursePeriodInMemoryRepository } from '@/course/infrastructure/database/in-memory/repositories/course-period-in-memory.repository';
import { faker } from '@faker-js/faker';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';
import { CourseEntity } from '@/course/domain/entities/course.entity';

describe('Signup use case test', () => {
  let sut: SignupUsecase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;
  let coursePeriodRepository: CoursePeriodInMemoryRepository;
  let courseRepository: CourseInMemoryRepository;
  let course: CourseEntity;
  let coursePeriod: CoursePeriodEntity;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    courseRepository = new CourseInMemoryRepository();
    coursePeriodRepository = new CoursePeriodInMemoryRepository();
    sut = new SignupUsecase.UseCase(
      repository,
      hashProvider,
      courseRepository,
      coursePeriodRepository,
    );

    coursePeriod = CoursePeriodEntity.fake().aCoursePeriod().build();
    coursePeriodRepository.insert(coursePeriod);

    course = CourseEntity.fake().aCourse().build();
    courseRepository.insert(course);
  });

  describe('Bad request errors', () => {
    it('should throw a BadRequestError if name is not provided', async () => {
      const input = {
        name: '',
        email: 'test@example.com',
        password: '123456',
        courseId: faker.string.uuid(),
        coursePeriodId: faker.string.uuid(),
      };

      await expect(sut.execute(input)).rejects.toThrow(BadRequestError);
    });

    it('should throw a BadRequestError if email is not provided', async () => {
      const input = {
        name: 'Test',
        email: '',
        password: '123456',
        courseId: faker.string.uuid(),
        coursePeriodId: faker.string.uuid(),
      };

      await expect(sut.execute(input)).rejects.toThrow(BadRequestError);
    });

    it('should throw a BadRequestError if password is not provided', async () => {
      const input = {
        name: 'Test',
        email: 'test@example.com',
        password: '',
        courseId: faker.string.uuid(),
        coursePeriodId: faker.string.uuid(),
      };

      await expect(sut.execute(input)).rejects.toThrow(BadRequestError);
    });

    it('should throw a BadRequestError if courseId is not provided', async () => {
      const input = {
        name: 'Test',
        email: 'test@example.com',
        password: 'asdasdsad',
        courseId: '',
        coursePeriodId: faker.string.uuid(),
      };

      await expect(sut.execute(input)).rejects.toThrow(BadRequestError);
    });
    it('should throw a BadRequestError if coursePeriodId is not provided', async () => {
      const input = {
        name: 'Test',
        email: 'test@example.com',
        password: 'adsasd',
        coursePeriodId: '',
        courseId: faker.string.uuid(),
      };

      await expect(sut.execute(input)).rejects.toThrow(BadRequestError);
    });
  });

  it('should ensure email is available before signup', async () => {
    const input = {
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
      courseId: course.id,
      coursePeriodId: coursePeriod.id,
    };

    const spyAssureEmail = jest.spyOn(
      repository,
      'assureEmailIsAvailableToUse',
    );

    await sut.execute(input);

    expect(spyAssureEmail).toHaveBeenCalledWith(input.email);
  });

  it('should ensure course exists before signup', async () => {
    const input = {
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
      courseId: course.id,
      coursePeriodId: coursePeriod.id,
    };

    const spyCourseExists = jest.spyOn(courseRepository, 'assureCourseExists');

    await sut.execute(input);

    expect(spyCourseExists).toHaveBeenCalledWith(input.courseId);
  });

  it('should ensure course period exists before signup', async () => {
    const input = {
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
      courseId: course.id,
      coursePeriodId: coursePeriod.id,
    };

    const spyCoursePeriodExists = jest.spyOn(
      coursePeriodRepository,
      'assureCoursePeriodExists',
    );

    await sut.execute(input);

    expect(spyCoursePeriodExists).toHaveBeenCalledWith(input.coursePeriodId);
  });

  it('should hash the password before storing the user', async () => {
    const input = {
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
      courseId: course.id,
      coursePeriodId: coursePeriod.id,
    };

    const spyGenerateHash = jest.spyOn(hashProvider, 'generateHash');

    await sut.execute(input);

    expect(spyGenerateHash).toHaveBeenCalledWith('123456');
  });

  it('should store the user with the hashed password', async () => {
    const input = {
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
      courseId: course.id,
      coursePeriodId: coursePeriod.id,
    };

    const spyInsert = jest.spyOn(repository, 'insert');

    await sut.execute(input);

    expect(spyInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.objectContaining({
          email: input.email,
          name: input.name,
          password: expect.any(String),
        }),
      }),
    );
  });

  it('should return the correct output after successful signup', async () => {
    const input = {
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
      courseId: course.id,
      coursePeriodId: coursePeriod.id,
    };

    const result = await sut.execute(input);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('createdAt');
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.password).not.toBe('123456');
  });
});
