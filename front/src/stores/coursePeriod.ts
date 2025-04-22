import { acceptHMRUpdate, defineStore } from 'pinia';
import type {
  AutocompleteCoursePeriodData,
  CoursePeriod,
} from 'src/types/coursePeriod';
import { indexCoursePeriods } from 'src/api/CoursePeriodApi';
import { MetaData } from 'src/types/common';

export const useCoursePeriodStore = defineStore('coursePeriod', {
  actions: {
    async autocomplete(
      autocomplete: AutocompleteCoursePeriodData,
    ): Promise<{ data: CoursePeriod[]; meta: MetaData }> {
      return indexCoursePeriods(
        autocomplete.autocomplete,
        autocomplete.page,
        autocomplete.courseId,
      );
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCoursePeriodStore, import.meta.hot),
  );
}
