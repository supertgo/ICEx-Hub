<style lang="scss">
@import '../css/status.circle.scss';
</style>

<template>
  <div class="status-container">
    <span :class="['circle', status]"></span>
    <span v-if="text" class="status-text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: String,
  status: {
    type: String,
    required: true,
    validator: (value: string) => ['active', 'inactive'].includes(value),
  },
});
</script>
