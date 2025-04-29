import { faker } from '@faker-js/faker';
import {
  ScheduleEntity,
  ScheduleProps,
} from '@/schedule/domain/entities/schedule.entity';
import { DayPatternEnum, TimeSlotEnum } from '../../schedule.constants';
import { ClassroomFakeBuilder } from '@/classroom/domain/fake-builder/classroom-fake.builder';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';

export function ScheduleDataBuilder(props: Partial<ScheduleProps>) {
  return {
    disciplineId: props.disciplineId || faker.string.uuid(),
    classroomId: props.classroomId || faker.string.uuid(),
    classroom: props.classroom || ClassroomFakeBuilder.aCADClassroom().build(),
    discipline: {
      id: faker.string.uuid(),
      name: faker.string.alpha(),
      code: faker.string.alpha(),
      courseId: faker.string.uuid(),
      coursePeriodId: faker.string.uuid(),
      createdAt: props.createdAt || new Date(),
      updatedAt: props.createdAt || new Date(),
    },

    dayPattern: props.dayPattern || DayPatternEnum.TUESDAY_THURSDAY,
    timeSlot: props.timeSlot || TimeSlotEnum.EVENING_1,
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
    class: props.class || faker.string.alpha(3),
  };
}

export function fakeScheduleProps(): {
  classroom: ClassroomEntity;
  course: CourseEntity;
  coursePeriodProps: {
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
} & ScheduleProps {
  const classroom = ClassroomEntity.fake().aCADClassroom().build();
  const entity = new ScheduleEntity(ScheduleDataBuilder({}));
  const discipline = new DisciplineEntity(DisciplineDataBuilder({}));
  const course = new CourseEntity(CourseDataBuilder({}));
  const coursePeriodProps = CoursePeriodDataBuilder({});

  return {
    classroom,
    course,
    discipline,
    coursePeriodProps,
    classroomId: classroom.id,
    disciplineId: discipline.id,
    dayPattern: entity.dayPattern,
    timeSlot: entity.timeSlot,
    class: entity.class,
  };
}
