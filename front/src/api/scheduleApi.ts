import { api } from 'boot/axios';
import { type ListScheduleParams, type ScheduleData } from 'src/types/schedule';

export const listSchedules = async ({
  courseId,
  coursePeriodId,
}: ListScheduleParams): Promise<ScheduleData> => {
  const url = new URL('http://localhost:3000/schedule');
  const params = new URLSearchParams(url.search);

  if (courseId) {
    params.set('courseId', courseId);
  }

  if (coursePeriodId) {
    params.set('coursePeriodId', coursePeriodId);
  }

  const response = await api.get(`/schedule?${params.toString()}`);

  return response.data;
};
