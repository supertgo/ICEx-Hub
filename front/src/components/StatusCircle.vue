<style lang="scss">
@import '../css/status.circle.scss';
</style>

<template>
  <div class="status-container">
    <span :class="[status ? activeStatusClass : inactiveStatusClass]"></span>
    <span class="status-text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeStatusClass = ref('green-status-circle');
const inactiveStatusClass = ref('red-status-circle');

defineProps({
  text: String,
  status: {
    type: Boolean,
    required: true,
  },
});
</script>
