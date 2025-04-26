import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';

export type DisciplineOutput = {
  id: string;
  name: string;
  code: string;
  courseId: string;
  coursePeriodId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class DisciplineOutputMapper {
  static toOutput(entity: DisciplineEntity): DisciplineOutput {
    return {
      id: entity.id,
      name: entity.name,
      code: entity.code,
      courseId: entity.courseId,
      coursePeriodId: entity.coursePeriodId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
