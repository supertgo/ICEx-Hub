import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';

export type ClassroomOutput = {
  id: string;
  name: string;
  building: string;
  createdAt: Date;
};

export class ClassroomOutputMapper {
  static toOutput(entity: ClassroomEntity): ClassroomOutput {
    return entity.toJSON();
  }
}
