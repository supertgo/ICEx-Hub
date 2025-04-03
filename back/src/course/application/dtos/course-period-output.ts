import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

export type CoursePeriodOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export class CoursePeriodOutputMapper {
  static toOutput(entity: CoursePeriodEntity): CoursePeriodOutput {
    return entity.toJSON();
  }
}
