export interface PerformanceIndicator {
  id?: number;
  name: string;
  unitOfMeasure: UnitOfMeasure;
}

export enum UnitOfMeasure {
  Role = 'Role1',
  Role2 = 'Role2',
}
