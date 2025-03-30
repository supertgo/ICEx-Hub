import { CourseEntity } from '@/course/domain/entities/course.entity';

export type CourseOutput = {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export class CourseOutputMapper {
  static toOutput(entity: CourseEntity): CourseOutput {
    return entity.toJSON();
  }
}
