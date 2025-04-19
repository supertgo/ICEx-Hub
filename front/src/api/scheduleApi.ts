import { api } from 'boot/axios';
import { type ListScheduleParams, type ScheduleData } from 'src/types/schedule';

export const listSchedules = async ({
  name,
  dayPatterns,
  timeSlots,
  courseId,
  coursePeriodId,
}: ListScheduleParams): Promise<ScheduleData> => {
  const url = new URL(process.env.VITE_API_URL ?? 'http://localhost:3000');
  const params = new URLSearchParams(url.search);

  if (name) {
    params.set('name', name.trim());
  }

  if (courseId) {
    params.set('courseId', courseId);
  }

  if (coursePeriodId) {
    params.set('coursePeriodId', coursePeriodId);
  }

  if (timeSlots?.length) {
    timeSlots.forEach((slot) => params.append('timeSlots', slot));
  }

  if (dayPatterns?.length) {
    dayPatterns.forEach((dayPattern) =>
      params.append('dayPatterns', dayPattern),
    );
  }

  const response = await api.get(`/schedule?${params.toString()}`);

  return response.data;
};
