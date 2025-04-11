export interface Classroom {
  id: string;
  name: string;
  building: ClassroomBuildingEnum;
}

export enum ClassroomBuildingEnum {
  ICEX = 'ICEX',
  CAD3 = 'CAD3',
}
