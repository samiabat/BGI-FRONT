import { Office } from 'src/app/offices/models/office.model';
import { Role } from 'src/app/roles/models/role.model';
import { PerformanceIndicator } from './performance-indicator.model';

export interface Employee {
  id?: number;
  name: string;
  role?: string[];
  phone?: Office;
  email?: string;
  // description: string;
}
