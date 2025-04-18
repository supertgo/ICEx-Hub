<style lang="scss">
@import '../css/index.page.scss';
</style>

<template>
  <div :class="['welcome-text-and-status-circle', 'q-pa-md']">
    <div class="q-pa-md container" style="text-align: left">
      Bem vindo(a) {{ user?.name || ' ' }}!<br />
      Pesquise por disciplina, ou use os filtros para encontrar sua sala.
    </div>
    <div class="q-pa-md circles" style="text-align: right">
      <StatusCircle status="active" text="Sala liberada no momento" />
      <StatusCircle status="inactive" text="Sala ocupada no momento" />
    </div>
  </div>

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
        class="q-ml-sm"
        style="height: 40px; align-self: center"
      />
    </div>

    <div class="filter-grid q-mb-md">
      <q-input
        borderless
        dense
        debounce="300"
        v-model="name"
        placeholder="Search"
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
        style="max-width: 250px"
        class="day-select"
      />

      <q-btn
        flat
        dense
        color="grey-7"
        icon="close"
        label="Limpar Filtros"
        style="height: 40px; align-self: center"
        @click="clearFilters"
        class="clear-btn"
      />
    </div>

    <q-table
      card-class="bg-grey-4 text-black"
      table-header-class="bg-blue-10 text-white font-bold text-uppercase"
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
      v-model:pagination="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import StatusCircle from 'src/components/StatusCircle.vue';
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
import { computed, onMounted, ref, watch } from 'vue';

const name = ref<string>('');
const selectedTimeSlots = ref<TimeSlotEnum[]>([]);
const selectedDayPatterns = ref<DayPatternEnum[]>([]);
const pagination = ref();
const userFiltersEnabled = ref({
  course: true,
  period: true,
});

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
    await loadSchedules(...newValue);
  },
);

async function loadSchedules(
  name = '',
  timeSlots: TimeSlotEnum[] = [],
  dayPatterns: DayPatternEnum[] = [],
  userFiltersEnabled = { course: true, period: true },
) {
  try {
    rows.value = [];
    const schedules = await scheduleStore.listSchedules({
      name: name,
      dayPatterns,
      timeSlots,
      ...(userFiltersEnabled.course && { courseId: user?.courseId }),
      ...(userFiltersEnabled.period && {
        coursePeriodId: user?.coursePeriodId,
      }),
    });

    rows.value = scheduleDataToOutput(schedules);

    pagination.value = {
      page: schedules.meta.currentPage,
      rowsNumber: schedules.meta.total,
      rowsPerPage: schedules.meta.perPage,
      descending: false,
    };
  } catch (error) {
    console.error('Error loading schedules:', error);
  }
}
</script>
