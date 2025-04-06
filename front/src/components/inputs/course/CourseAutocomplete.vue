<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { QSelect } from 'quasar';
import type { AutocompleteCourseData, Course } from 'src/types/course';
import { useCourseStore } from 'stores/course';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: 'course.name',
  },
  modelValue: {
    type: [String, null],
    required: true,
  },
  rules: {
    type: Array,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue' as const]);
const autocomplete: AutocompleteCourseData = {
  autocomplete: '',
};

const options = ref<{ label: string; value: string }[]>([]);
const courseStore = useCourseStore();

type QuasarFilterMethod = (
  inputValue: string,
  doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abortFn: () => void,
) => void;

const searchCourses: QuasarFilterMethod = (inputValue, doneFn, abortFn) => {
  const autocomplete: AutocompleteCourseData = {
    autocomplete: inputValue,
  };

  courseStore
    .autocomplete(autocomplete)
    .then((response: Course[]) => {
      const formatted = response.map((option: Course) => ({
        label: `${option.code} - ${option.name}`,
        value: option.id,
      }));

      doneFn(() => {
        options.value = formatted;
      });
    })
    .catch(() => {
      abortFn();
    });
};

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>

<template>
  <q-select
    v-model="selectedValue"
    :label="$t(label)"
    :options="options"
    input-debounce="5"
    use-input
    @filter="searchCourses"
    emit-value
    map-options
    :autocomplete="autocomplete.autocomplete"
  />
</template>

<style scoped></style>
