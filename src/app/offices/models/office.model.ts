export interface Office {
  id?: number;
  officeCode?: string;
  ownsActivities?: boolean;
  name: string;
  location: string;
  parent?: Office;
}
