import { CourseEntity } from '@/course/domain/entities/course.entity';

export type CourseOutput = {}

export class CourseOutputMapper {
  static toOutput(entity: CourseEntity): CourseOutput {
    return entity.toJSON();
  }
}
