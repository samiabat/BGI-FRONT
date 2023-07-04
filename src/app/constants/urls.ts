import { DASHBOARD_ROUTE, EMPLOYEES_ROUTE, LOGIN_ROUTE, MANAGE_ACCOUNT_ROUTE, ROLES_ROUTE, SECTORS_ROUTE } from "./routes";

export const API_BASE_URL = `https://accountmanager.onrender.com`;
export const ROLES_URL = `${API_BASE_URL}/${ROLES_ROUTE}/`;
export const SECTORS_URL = `${API_BASE_URL}/${SECTORS_ROUTE}/`;
export const EMPLOYEES_URL = `${API_BASE_URL}/${EMPLOYEES_ROUTE}/`;
export const LOGIN_URL = `${API_BASE_URL}/api/${LOGIN_ROUTE}/`;
export const DASHBOARD_URL = `${API_BASE_URL}/${DASHBOARD_ROUTE}/`
export const MANAGE_ACCOUNT_URL = `${API_BASE_URL}/${MANAGE_ACCOUNT_ROUTE}/`
