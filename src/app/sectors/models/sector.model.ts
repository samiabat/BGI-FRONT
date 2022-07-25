import { Role } from 'src/app/roles/models/role.model';

export interface Sector {
  id?: number;
  name: string;
  role?: string;
  deleted?: string;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}
