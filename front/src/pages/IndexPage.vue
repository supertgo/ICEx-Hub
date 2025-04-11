<style lang="scss">
@import '../css/index.page.scss';
@import '../css/quasar.variables.scss';
</style>

<template>
  <div :class="['welcome-text-and-status-circle', 'q-pa-md']">
    <div class="q-pa-md container" style="text-align: left">
      Bem vindo(a)! <br />
      Pesquise por disciplina, ou use os filtros para encontrar sua sala.
    </div>
    <div class="q-pa-md" style="text-align: right">
      <StatusCircle status="active" text="Sala liberada no momento" />
      <StatusCircle status="inactive" text="Sala ocupada no momento" />
    </div>
  </div>
  <div :class="['q-pa-md', 'table']">
    <q-table
      card-class="bg-grey-4 text-black"
      table-header-class="bg-blue-10 text-white font-bold text-uppercase"
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    />
  </div>
</template>

<script setup lang="ts">
import StatusCircle from 'src/components/StatusCircle.vue';
import { useScheduleStore } from 'src/stores/schedule';
import { type ScheduleRows } from 'src/types/schedule';
import { scheduleDataToOutput, columns } from 'src/utils/schedule/table';
import { onMounted, ref } from 'vue';

const rows = ref<ScheduleRows[]>([]);
const scheduleStore = useScheduleStore();

onMounted(async () => {
  try {
    const schedules = await scheduleStore.listSchedules();
    rows.value = scheduleDataToOutput(schedules);
  } catch (error) {
    console.error('Error loading schedules:', error);
  }
});
</script>
