<style lang="scss">
@import '../../css/table/table.status.scss';
</style>

<script setup lang="ts">
import StatusCircle from 'src/components/StatusCircle.vue';

const { userName } = defineProps({
  userName: {
    type: [String],
    required: false,
  },
});
</script>

<template>
  <div :class="['welcome-text-and-status-circle', 'q-pa-md']">
    <div class="q-pa-md container" style="text-align: left">
      Bem vindo(a) {{ userName || '' }}!<br />
      Pesquise por disciplina, ou use os filtros para encontrar sua sala.
    </div>
    <div class="q-pa-md circles" style="text-align: right">
      <StatusCircle status="inactive" text="Sala liberada no momento" />
      <StatusCircle status="active" text="Sala ocupada no momento" />
    </div>
  </div>
</template>
