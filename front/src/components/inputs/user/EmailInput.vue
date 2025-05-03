<template>
  <q-input
    v-model="modelValue"
    label="Email"
    type="email"
    :rules="rules"
    dense
    rounded
    outlined
  >
    <template v-slot:prepend> <q-icon name="email" /> </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ValidationRule } from 'quasar';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  rules: {
    type: Array<ValidationRule>,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style lang="scss">
.custom-email-input {
  margin-bottom: 16px;

  .q-field__control {
    border-radius: 8px;
    transition: all 0.3s ease;

    &:before {
      border-color: #c4c4c4;
    }

    &:hover:before {
      border-color: #888;
    }
  }

  &.has-error .q-field__control {
    background-color: #fff0f0;
  }

  .q-icon {
    color: #666;
  }
}
</style>
