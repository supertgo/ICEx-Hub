<script lang="ts" setup>
import { useCourseStore } from 'stores/course';
import type { Course } from 'src/types/course';
import AbstractAutocomplete from 'components/inputs/abstract/AbstractAutocomplete.vue';

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

const courseStore = useCourseStore();

const searchCourses = async (input: string) => {
  const response: Course[] = await courseStore.autocomplete({
    autocomplete: input,
  });
  return response.map((course) => ({
    label: `${course.code} - ${course.name}`,
    value: course.id,
  }));
};
</script>

<template>
  <AbstractAutocomplete
    :model-value="props.modelValue"
    :rules="props.rules"
    label="course.name"
    :search-fn="searchCourses"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>
