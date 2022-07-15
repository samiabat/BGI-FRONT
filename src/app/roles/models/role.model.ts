import { Office } from 'src/app/offices/models/office.model';

export interface Role {
  id?: number;
  description: string;
  code: string;
  owner?: Office;
}
