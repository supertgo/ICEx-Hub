import { type QTableColumn } from 'quasar';
import {
  type Schedule,
  type ScheduleData,
  type ScheduleRows,
} from 'src/types/schedule';

//TODO Arthur & Laura -> schduleDataToOutput(create test for this method on table.spec.ts)
export function scheduleDataToOutput(schedules: ScheduleData) {
  return schedules.data.map(
    (item: Schedule) =>
      ({
        name: item.discipline.name,
        code: item.discipline.code,
        start: item.timeSlot,
        end: item.timeSlot,
        days: item.dayPattern,
        unit: item.classroom.building,
        classroom: item.classroom.name,
        direction: 'Ver Mapa',
        status: false,
      }) as ScheduleRows,
  );
}

export const columns: QTableColumn[] = [
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
