import { acceptHMRUpdate, defineStore } from 'pinia';
import { listSchedules } from 'src/api/scheduleApi';
import { type ListScheduleParams, type ScheduleData } from 'src/types/schedule';

export const useScheduleStore = defineStore('schedule', {
  actions: {
    async listSchedules(params: ListScheduleParams): Promise<ScheduleData> {
      const result = await listSchedules(params);

      return result;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScheduleStore, import.meta.hot));
}
