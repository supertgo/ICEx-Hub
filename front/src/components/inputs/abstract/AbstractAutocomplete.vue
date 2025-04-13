<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { QSelect } from 'quasar';

type ValidationRule = (val: unknown) => boolean | string;

const props = defineProps({
  modelValue: {
    type: [String, null],
    required: true,
  },
  rules: {
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  searchFn: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const options = ref<{ label: string; value: string }[]>([]);
const autocomplete = ref('');

type QuasarFilterMethod = (
  inputValue: string,
  doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abortFn: () => void,
) => void;
type Option = { label: string; value: string };

const onFilter: QuasarFilterMethod = (inputValue, doneFn, abortFn) => {
  autocomplete.value = inputValue;

  props
    .searchFn(inputValue)
    .then((formatted: Option[]) => {
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

const typedRules = props.rules as ValidationRule[] | undefined;
</script>

<template>
  <q-select
    v-model="selectedValue"
    :label="$t(label ?? '')"
    :options="options"
    input-debounce="5"
    use-input
    @filter="onFilter"
    emit-value
    map-options
    :autocomplete="autocomplete"
    :rules="typedRules"
  />
</template>
