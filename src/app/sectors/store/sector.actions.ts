import { Role } from 'src/app/roles/models/role.model';
import { Sector } from '../models/sector.model';

export class GetSectors {
  static readonly type = '[Sector] GetObjectives';
}

export class GetSectorById {
  static readonly type = '[Sector] GetSectorById';
  constructor(public id: number) {}
}

export class GetSectorByGoal {
  static readonly type = '[Sectors] GetSectorsByGoal';
  constructor(public role: Role) {}
}

export class CreateSector {
  static readonly type = '[Sector] CreateSector';
  constructor(public sector: Sector) {}
}

export class UpdateSector {
  static readonly type = '[Sector] UpdateSector';
  constructor(public id: number, public sector: Sector) {}
}

export class DeleteSector {
  static readonly type = '[Sector] DeleteSector';
  constructor(public id: number) {}
}

export class SelectSector {
  static readonly type = '[Sector] SelectSector';
  constructor(public sector: Sector) {}
}
