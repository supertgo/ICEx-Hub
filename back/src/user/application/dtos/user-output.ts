import { UserEntity } from '@/user/domain/entities/user.entity';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  courseId?: string;
  coursePeriodId?: string;
};

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserOutput {
    return entity.toJSON();
  }
}
