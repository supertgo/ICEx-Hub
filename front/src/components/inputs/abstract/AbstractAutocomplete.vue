<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue';
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
const loading = ref(false);
const nextPage = ref(1);
const lastPage = ref(0);

type QuasarFilterMethod = (
  inputValue: string,
  doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abortFn: () => void,
) => void;
type Option = { label: string; value: string };
type PaginatedResponse = {
  data: Option[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

const onFilter: QuasarFilterMethod = (inputValue, doneFn, abortFn) => {
  autocomplete.value = inputValue;

  props
    .searchFn(inputValue, nextPage.value)
    .then((formatted: PaginatedResponse) => {
      doneFn(() => {
        options.value = formatted.data;
        lastPage.value = formatted.meta.lastPage;
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

const onScroll = async ({
  to,
  ref,
}: {
  to: number;
  ref: { refresh: () => void };
}) => {
  const lastIndex = options.value.length - 1;

  if (!loading.value && nextPage.value <= lastPage.value && to >= lastIndex) {
    loading.value = true;

    nextPage.value++;
    await nextTick();
    ref.refresh();
    loading.value = false;
  }
};
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
    :loading="loading"
    @virtual-scroll="onScroll"
  />
</template>
