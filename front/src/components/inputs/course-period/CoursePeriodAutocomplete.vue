<script lang="ts" setup>
import AbstractAutocomplete from 'components/inputs/abstract/AbstractAutocomplete.vue';
import type { CoursePeriod } from 'src/types/coursePeriod';
import { useCoursePeriodStore } from 'stores/coursePeriod';
import { computed, watch } from 'vue';
type PaginationMeta = {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
};

const props = defineProps({
  modelValue: {
    type: [String, null],
    required: true,
  },
  rules: {
    type: Array,
    required: false,
  },
  courseId: {
    type: String,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const coursePeriodStore = useCoursePeriodStore();

const searchCoursePeriods = async (page: number) => {
  if (!props.courseId) {
    return [];
  }
  const response: { data: CoursePeriod[]; meta: PaginationMeta } =
    await coursePeriodStore.autocomplete({
      autocomplete: props.courseId,
      page,
    });
  const data = response.data.map((period) => ({
    label: period.name,
    value: period.id,
  }));
  return { data: data, meta: response.meta };
};

const courseRequired = computed(() => {
  return () => {
    if (!props.courseId) {
      return 'O curso é obrigatório para selecionar o período';
    }
    return true;
  };
});

watch(
  () => props.courseId,
  (newCourseId, oldCourseId) => {
    if (newCourseId !== oldCourseId) {
      emit('update:modelValue', null);
    }
  },
);
</script>

<template>
  <AbstractAutocomplete
    :model-value="props.modelValue"
    :rules="[, courseRequired, ...props.rules]"
    label="coursePeriod.name"
    :search-fn="searchCoursePeriods"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>
