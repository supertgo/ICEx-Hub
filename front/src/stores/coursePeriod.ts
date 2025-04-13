import { acceptHMRUpdate, defineStore } from 'pinia';
import type {
  AutocompleteCoursePeriodData,
  CoursePeriod,
} from 'src/types/coursePeriod';
import { indexCoursePeriods } from 'src/api/CoursePeriodApi';

export const useCoursePeriodStore = defineStore('coursePeriod', {
  actions: {
    async autocomplete(
      autocomplete: AutocompleteCoursePeriodData,
    ): Promise<CoursePeriod[]> {
      return indexCoursePeriods(autocomplete.autocomplete);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCoursePeriodStore, import.meta.hot),
  );
}
