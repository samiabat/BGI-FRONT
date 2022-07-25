import { Role } from 'src/app/roles/models/role.model';
import { PerformanceIndicator } from './performance-indicator.model';

export interface Employee {
  id?: number;
  name: string;
  role?: string[];
  phone?: string;
  email?: string;
  // description: string;
}
