import { acceptHMRUpdate, defineStore } from 'pinia';
import { listSchedules } from 'src/api/scheduleApi';
import { type ScheduleData } from 'src/types/schedule';

export const useScheduleStore = defineStore('schedule', {
  actions: {
    async listSchedules(): Promise<ScheduleData> {
      const result = await listSchedules();

      return result;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScheduleStore, import.meta.hot));
}
