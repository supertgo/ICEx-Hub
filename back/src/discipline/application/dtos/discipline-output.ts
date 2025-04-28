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
    return entity.toJSON();
  }
}
