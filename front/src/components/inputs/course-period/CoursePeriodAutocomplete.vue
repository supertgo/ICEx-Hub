<script lang="ts" setup>
import AbstractAutocomplete from 'components/inputs/abstract/AbstractAutocomplete.vue';
import type { CoursePeriod } from 'src/types/coursePeriod';
import { useCoursePeriodStore } from 'stores/coursePeriod';

const props = defineProps({
  modelValue: {
    type: [String, null],
    required: true,
  },
  rules: {
    type: Array,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const coursePeriodStore = useCoursePeriodStore();

const searchCoursePeriods = async (input: string) => {
  const response: CoursePeriod[] = await coursePeriodStore.autocomplete({
    autocomplete: input,
  });
  return response.map((period) => ({
    label: period.name,
    value: period.id,
  }));
};
</script>

<template>
  <AbstractAutocomplete
    :model-value="props.modelValue"
    :rules="props.rules"
    label="coursePeriod.name"
    :search-fn="searchCoursePeriods"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>
