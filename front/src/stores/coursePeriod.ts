import { acceptHMRUpdate, defineStore } from 'pinia';
import type {
  AutocompleteCoursePeriodData,
  CoursePeriod,
} from 'src/types/coursePeriod';
import type { PaginationMeta } from 'src/types/common';
import { indexCoursePeriods } from 'src/api/CoursePeriodApi';

export const useCoursePeriodStore = defineStore('coursePeriod', {
  actions: {
    async autocomplete(
      autocomplete: AutocompleteCoursePeriodData,
    ): Promise<{ data: CoursePeriod[]; meta: PaginationMeta }> {
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
