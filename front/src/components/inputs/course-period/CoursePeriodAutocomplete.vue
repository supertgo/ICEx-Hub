<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { QSelect } from 'quasar';
import type { AutocompleteCourseData } from 'src/types/course';
import { useCoursePeriodStore } from 'stores/coursePeriod';
import type { CoursePeriod } from 'src/types/coursePeriod';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: 'coursePeriod.name',
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
const coursePeriodStore = useCoursePeriodStore();

type QuasarFilterMethod = (
  inputValue: string,
  doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abortFn: () => void,
) => void;

const searchCoursePeriods: QuasarFilterMethod = (inputValue, doneFn, abortFn) => {
  const autocomplete: AutocompleteCourseData = {
    autocomplete: inputValue,
  };

  coursePeriodStore
    .autocomplete(autocomplete)
    .then((response: CoursePeriod[]) => {
      const formatted = response.map((option: CoursePeriod) => ({
        label: option.name,
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
    @filter="searchCoursePeriods"
    emit-value
    map-options
    :autocomplete="autocomplete.autocomplete"
  />
</template>

<style scoped></style>
