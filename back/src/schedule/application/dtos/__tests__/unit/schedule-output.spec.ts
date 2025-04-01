import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleOutputMapper } from '@/schedule/application/dtos/schedule-output';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';

describe('Schedule output unit tests', () => {
  it('should convert a schedule in output', () => {
    const schedule = new ScheduleEntity(ScheduleDataBuilder({}));
    const spyOn = jest.spyOn(schedule, 'toJSON');
    const scheduleMapper = ScheduleOutputMapper.toOutput(schedule);

    expect(spyOn).toHaveBeenCalledTimes(1);
    expect(scheduleMapper).toStrictEqual(schedule.toJSON());
  });
});
