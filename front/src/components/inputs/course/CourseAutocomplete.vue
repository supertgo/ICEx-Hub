<script lang="ts" setup>
import AbstractAutocomplete from 'components/inputs/abstract/AbstractAutocomplete.vue';
import { useCourseStore } from 'stores/course';
import type { Course } from 'src/types/course';
import type { MetaData } from 'src/types/common';

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

const searchCourses = async (input: string, page: number) => {
  const response: { data: Course[]; meta: MetaData } =
    await courseStore.autocomplete({
      autocomplete: input,
      page: page,
    });
  const data = response.data.map((course: Course) => ({
    label: `${course.name} (${course.code})`,
    value: course.id,
  }));

  return { data: data, meta: response.meta };
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
