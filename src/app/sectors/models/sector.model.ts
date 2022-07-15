import { Role } from 'src/app/roles/models/role.model';
import { Office } from 'src/app/offices/models/office.model';

export interface Sector {
  id?: number;
  description: string;
  code?: string;
  role: Role;
  owner?: Office;
}
