<template>
  <q-input
    v-model="modelValue"
    label="Senha"
    type="password"
    :rules="rules"
    dense
    rounded
    outlined
  >
    <template v-slot:prepend> <q-icon name="password" /> </template>
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
  label: {
    type: String,
    default: 'Senha',
  },
});

const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
