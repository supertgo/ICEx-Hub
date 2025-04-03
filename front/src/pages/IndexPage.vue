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
import type { QTableColumn } from 'quasar';
import StatusCircle from 'src/components/StatusCircle.vue';
import { useScheduleStore } from 'src/stores/schedule';
import { type Schedule } from 'src/types/schedule';
import { onMounted, ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rows = ref<any[]>([]);
const scheduleStore = useScheduleStore();

const columns: QTableColumn[] = [
  {
    name: 'discipline',
    required: true,
    label: 'Disciplina',
    align: 'center',
    field: (row: { name: string }) => row.name,
    format: (val: string) => `${val}`,
    classes: 'discipline-column',
  },
  { name: 'code', align: 'center', label: 'Código', field: 'code' },
  //{ name: 'class', align: 'center', label: 'Turma', field: 'class' },
  { name: 'start', align: 'center', label: 'Início', field: 'start' },
  { name: 'end', align: 'center', label: 'Fim', field: 'end' },
  { name: 'days', align: 'center', label: 'Dias', field: 'days' },
  { name: 'unit', align: 'center', label: 'Unidade', field: 'unit' },
  { name: 'classroom', align: 'center', label: 'Sala', field: 'classroom' },
  {
    name: 'direction',
    align: 'center',
    label: 'Como chegar',
    field: 'direction',
  },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
];

onMounted(async () => {
  try {
    const result = await scheduleStore.listSchedules();
    rows.value = result.data.map((item: Schedule) => ({
      name: item.discipline?.name || 'N/A',
      code: item.discipline?.code || 'N/A',
      //class: item.classIdentifier || 'N/A',
      start: item.timeSlot || 'N/A',
      end: item.timeSlot || 'N/A',
      days: item.dayPattern || 'N/A',
      unit: item.classroom?.building || 'N/A',
      classroom: item.classroom?.name || 'N/A',
      direction: 'Ver Mapa',
      status: false,
    }));
  } catch (error) {
    console.error('Error loading schedules:', error);
  }
});
</script>
