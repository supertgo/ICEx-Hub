<script lang="ts" setup>
import AbstractAutocomplete from 'components/inputs/abstract/AbstractAutocomplete.vue';
import type { CoursePeriod } from 'src/types/coursePeriod';
import { useCoursePeriodStore } from 'stores/coursePeriod';
import { computed } from 'vue';
import type { PaginationMeta } from 'src/types/common';

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

const searchCoursePeriods = async (input: string, page: number) => {
  if (!props.courseId) {
    return [];
  }
  const response: { data: CoursePeriod[]; meta: PaginationMeta } =
    await coursePeriodStore.autocomplete({
      autocomplete: input,
      page,
      courseId: props.courseId,
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
</script>

<template>
  <AbstractAutocomplete
    :model-value="props.modelValue"
    :rules="[...props.rules, courseRequired]"
    label="coursePeriod.name"
    :search-fn="searchCoursePeriods"
    :disable="!props.courseId"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>
