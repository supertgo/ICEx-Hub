import { api } from 'boot/axios';
import { type ScheduleData } from 'src/types/schedule';

export const listSchedules = async (): Promise<ScheduleData> => {
  const response = await api.get('/schedule');

  return response.data;
};
