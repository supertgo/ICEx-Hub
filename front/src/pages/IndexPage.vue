<style lang="scss">
@import '../css/index.page.scss';
@import '../css/quasar.variables.scss';
</style>

<template>
  <div :class="['welcome-text-and-status-circle', 'q-pa-md']">
    <div class="q-pa-md container" style="text-align: left">
      <AppBrand />
      Bem vindo(a)! <br />
      Pesquise por disciplina, ou use os filtros para encontrar sua sala.
    </div>
    <div class="q-pa-md" style="text-align: right">
      <StatusCircle status="active" text="Sala liberada no momento" />
      <StatusCircle status="inactive" text="Sala ocupada no momento" />
    </div>
  </div>
  <div :class="['q-pa-md', 'table']">
    <q-table card-class="bg-grey-4 text-black" table-header-class="bg-blue-10 text-white font-bold text-uppercase"
     flat bordered :rows="rows" :columns="columns" row-key="name" hide-bottom />
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import StatusCircle from 'src/components/StatusCircle.vue';
import AppBrand from 'src/components/AppBrand.vue';

const columns: QTableColumn[] = [
  {
    name: 'discipline',
    required: true,
    label: 'Disciplina',
    align: 'center',
    field: (row: { name: string }) => row.name,
    format: (val: string) => `${val}`,
    classes:'discipline-column',
    
  },
  { name: 'code', align: 'center', label: 'Código', field: 'code'},
  { name: 'class', align: 'center', label: 'Turma', field: 'class' },
  { name: 'start', align: 'center', label: 'Início', field: 'start' },
  { name: 'end', align: 'center', label: 'Fim', field: 'end'},
  { name: 'days', align: 'center', label: 'Dias', field: 'days' },
  { name: 'unit', align: 'center', label: 'Unidade', field: 'unit'},
  { name: 'classroom', align: 'center', label: 'Sala', field: 'classroom'},
  { name: 'direction', align: 'center', label: 'Como chegar', field: 'direction' },
  { name: 'status', align: 'center', label: 'Status', field: 'status'},
];

const rows = [
  {
    name: 'Algoritmos I',
    code: 'DCC206',
    class: 'TN',
    start: '14:55',
    end: '16:35',
    days: 'Ter-Qui',
    unit: 'CAD 3',
    classroom: '201',
    direction: 'Ver Mapa',
    status: false,
  },
  {
    name: 'Algoritmos I',
    code: 'DCC206',
    class: 'TN1',
    start: '19:00',
    end: '20:40',
    days: 'Ter-Qui',
    unit: 'CAD 3',
    classroom: '201',
    direction: 'Ver Mapa',
    status: false,
  },
  {
    name: 'Organ. e Tratamento da Informação',
    code: 'OTI071',
    class: 'TZ',
    start: '17:00',
    end: '18:40',
    days: 'Seg-Qua',
    unit: 'CAD 3',
    classroom: '412',
    direction: 'Ver Mapa',
    status: false,
  },
  {
    name: 'Estrutura de Dados',
    code: 'DCC205',
    class: 'TW',
    start: '19:00',
    end: '20:40',
    days: 'Ter-Qui',
    unit: 'CAD 3',
    classroom: 'LAICO B307',
    direction: 'Ver Mapa',
    status: false,
  },
];
</script>
