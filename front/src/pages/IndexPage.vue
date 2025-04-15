<style lang="scss">
@import '../css/index.page.scss';
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
    <div class="filter-grid q-mb-md">
      <q-input
        borderless
        dense
        debounce="300"
        v-model="name"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-select
        class="col"
        dense
        v-model="selectedTimeSlots"
        :options="timeSlotOptions"
        label="Horário"
        multiple
        emit-value
        map-options
        clearable
        use-chips
      />

      <q-select
        class="col"
        dense
        v-model="selectedDayPatterns"
        :options="dayPatternOptions"
        label="Dias"
        multiple
        emit-value
        map-options
        clearable
        use-chips
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
  TimeSlotEnum,
  DayPatternEnum,
} from 'src/utils/schedule/table';
import { onMounted, ref, watch } from 'vue';

const timeSlotMap = {
  [TimeSlotEnum.MORNING_1]: '7:30 - 9:10',
  [TimeSlotEnum.MORNING_2]: '9:25 - 11:05',
  [TimeSlotEnum.MORNING_3]: '11:10 - 12:00',
  [TimeSlotEnum.AFTERNOON_1]: '13:00 - 14:40',
  [TimeSlotEnum.AFTERNOON_2]: '14:55 - 16:35',
  [TimeSlotEnum.EVENING_1]: '17:00 - 18:40',
  [TimeSlotEnum.EVENING_2]: '19:00 - 20:40',
  [TimeSlotEnum.EVENING_3]: '20:55 - 22:35',
};

const dayPatternMap = {
  [DayPatternEnum.MONDAY]: 'Seg',
  [DayPatternEnum.TUESDAY]: 'Ter',
  [DayPatternEnum.WEDNESDAY]: 'Qua',
  [DayPatternEnum.THURSDAY]: 'Qui',
  [DayPatternEnum.FRIDAY]: 'Sex',
  [DayPatternEnum.SATURDAY]: 'Sab',
  [DayPatternEnum.MONDAY_WEDNESDAY]: 'Seg-Qua',
  [DayPatternEnum.TUESDAY_THURSDAY]: 'Ter-Qui',
};

const dayPatternOptions = Object.values(DayPatternEnum).map((value) => ({
  label: dayPatternMap[value],
  value: value,
}));

const timeSlotOptions = Object.values(TimeSlotEnum).map((value) => ({
  label: timeSlotMap[value],
  value: value,
}));

const name = ref<string>('');
const selectedTimeSlots = ref<TimeSlotEnum[]>([]);
const selectedDayPatterns = ref<DayPatternEnum[]>([]);

const { user } = useAuthStore();
const rows = ref<ScheduleRows[]>([]);
const scheduleStore = useScheduleStore();

onMounted(async () => {
  await loadSchedules();
});

watch([name, selectedTimeSlots, selectedDayPatterns], async (newValue) => {
  await loadSchedules(...newValue);
});

async function loadSchedules(
  name = '',
  timeSlots: TimeSlotEnum[] = [],
  dayPatterns: DayPatternEnum[] = [],
) {
  try {
    const schedules = await scheduleStore.listSchedules({
      name: name,
      dayPatterns,
      timeSlots,
      courseId: user?.courseId,
      coursePeriodId: user?.coursePeriodId,
    });
    rows.value = scheduleDataToOutput(schedules);
  } catch (error) {
    console.error('Error loading schedules:', error);
  }
}
</script>
