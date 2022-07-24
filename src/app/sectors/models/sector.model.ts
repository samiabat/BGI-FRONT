import { Role } from 'src/app/roles/models/role.model';
import { Office } from 'src/app/offices/models/office.model';

export interface Sector {
  id?: number;
  name: string;
  role?: string;
  deleted?: string;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}
