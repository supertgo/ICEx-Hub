<style lang="scss">
@import '../css/index.page.scss';
</style>

<template>
  <TableStatus :user-name="user?.name || ''" />

  <div :class="['q-pa-md', 'table']">
    <div
      class="active-filters q-mb-sm"
      v-if="hasCourseFilters || showRestoreButton"
    >
      <div>
        <q-chip
          v-if="user?.courseId && userFiltersEnabled.course"
          color="blue-10"
          text-color="white"
          icon="school"
          removable
          @remove="removeCourseFilter"
        >
          Seu curso
        </q-chip>

        <q-chip
          v-if="user?.coursePeriodId && userFiltersEnabled.period"
          color="blue-10"
          text-color="white"
          icon="schedule"
          removable
          @remove="removePeriodFilter"
        >
          Seu período atual
        </q-chip>
      </div>

      <q-btn
        v-if="showRestoreButton"
        flat
        dense
        color="blue-10"
        icon="replay"
        @click="restoreUserFilters"
        class="q-ml-sm table-filters-restore-button"
      />
    </div>

    <div class="filter-grid q-mb-md">
      <q-input
        borderless
        dense
        debounce="300"
        v-model="name"
        placeholder="Pesquisar"
        filled
        class="search-input"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-select
        dense
        v-model="selectedTimeSlots"
        :options="timeSlotOptions"
        label="Horário"
        multiple
        emit-value
        map-options
        clearable
        filled
        class="time-select"
      />

      <q-select
        dense
        v-model="selectedDayPatterns"
        :options="dayPatternOptions"
        label="Dias"
        multiple
        emit-value
        map-options
        clearable
        filled
        class="day-select"
      />

      <q-btn
        flat
        dense
        color="grey-7"
        icon="close"
        label="Limpar Filtros"
        @click="clearFilters"
        class="table-filters-restore-button clear-btn"
      />
    </div>

    <q-table
      card-class="bg-grey-4 text-black"
      table-header-class="bg-blue-10 text-white font-bold text-uppercase"
      class="q-table"
      flat
      bordered
      hide-pagination
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="name"
      no-data-label="Nenhum resultado encontrado"
      virtual-scroll
      v-model:pagination="pagination"
      :virtual-scroll-item-size="10"
      :virtual-scroll-sticky-size-start="10"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <StatusCircle :status="props.value" />
        </q-td>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import StatusCircle from 'src/components/StatusCircle.vue';
import TableStatus from 'src/components/table/TableStatus.vue';
import { useAuthStore } from 'src/stores/auth';
import { useScheduleStore } from 'src/stores/schedule';
import { type ScheduleRows } from 'src/types/schedule';
import {
  scheduleDataToOutput,
  columns,
  dayPatternOptions,
  timeSlotOptions,
  type TimeSlotEnum,
  type DayPatternEnum,
} from 'src/utils/schedule/table';
import { computed, onMounted, ref, watch, nextTick } from 'vue';
import type { Component } from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';

const name = ref<string>('');
const selectedTimeSlots = ref<TimeSlotEnum[]>([]);
const selectedDayPatterns = ref<DayPatternEnum[]>([]);
const pagination = ref();
const userFiltersEnabled = ref({
  course: true,
  period: true,
});
const loading = ref(false);
const nextPage = ref(1);
const lastPage = ref(0);

const hasCourseFilters = computed(() => {
  return (
    (user?.courseId && userFiltersEnabled.value.course) ||
    (user?.coursePeriodId && userFiltersEnabled.value.period)
  );
});

const showRestoreButton = computed(() => {
  return (
    (user?.courseId && !userFiltersEnabled.value.course) ||
    (user?.coursePeriodId && !userFiltersEnabled.value.period)
  );
});

const removeCourseFilter = () => {
  const period = userFiltersEnabled.value.period;
  userFiltersEnabled.value = { course: false, period };
};

const removePeriodFilter = () => {
  const course = userFiltersEnabled.value.course;
  userFiltersEnabled.value = { course, period: false };
};

const restoreUserFilters = () => {
  userFiltersEnabled.value = { course: true, period: true };
};

const clearFilters = () => {
  name.value = '';
  selectedTimeSlots.value = [];
  selectedDayPatterns.value = [];
};

const { user } = useAuthStore();
const rows = ref<ScheduleRows[]>([]);
const scheduleStore = useScheduleStore();

onMounted(async () => {
  await loadSchedules();
});

watch(
  [name, selectedTimeSlots, selectedDayPatterns, userFiltersEnabled],
  async (newValue) => {
    nextPage.value = 1;
    await loadSchedules(...newValue);
  },
);

async function loadSchedules(
  name = '',
  timeSlots: TimeSlotEnum[] = [],
  dayPatterns: DayPatternEnum[] = [],
  userFiltersEnabled = { course: true, period: true },
  page?: number,
) {
  try {
    const currentPage = page ?? nextPage.value;

    if (currentPage === 1) {
      rows.value = [];
    }

    const schedules = await scheduleStore.listSchedules({
      name,
      dayPatterns,
      timeSlots,
      ...(userFiltersEnabled.course && { courseId: user?.courseId }),
      ...(userFiltersEnabled.period && {
        coursePeriodId: user?.coursePeriodId,
      }),
      page: currentPage,
    });

    rows.value = [...rows.value, ...scheduleDataToOutput(schedules)];

    pagination.value = {
      page: schedules.meta.currentPage,
      rowsNumber: schedules.meta.total,
      rowsPerPage: schedules.meta.perPage,
      descending: false,
    };

    lastPage.value = schedules.meta.lastPage;
  } catch (error) {
    let message = 'Não foi possível buscar pela agenda de horários.';

    if (axios.isAxiosError(error)) {
      if (error.status === 422) {
        const resMessage = error.response?.data?.message;

        if (resMessage.startsWith('Invalid timeSlot')) {
          message = 'Não foi possível encontrar esse horário.';
        }

        if (resMessage.startsWith('Invalid dayPattern')) {
          message = 'Não foi possível encontrar esse dia.';
        }
      }
    }

    Notify.create({
      type: 'negative',
      message,
      timeout: 2000,
    });
  }
}

const onScroll = async (details: {
  index: number;
  from: number;
  to: number;
  direction: 'increase' | 'decrease';
  ref: Component & { refresh?: () => void };
}) => {
  const lastIndex = rows.value.length - 1;

  if (
    loading.value !== true &&
    nextPage.value < lastPage.value &&
    details.to === lastIndex
  ) {
    loading.value = true;
    nextPage.value++;

    await loadSchedules(
      name.value,
      selectedTimeSlots.value,
      selectedDayPatterns.value,
      userFiltersEnabled.value,
    );

    await nextTick();
    details.ref.refresh?.();
    loading.value = false;
  }
};
</script>
