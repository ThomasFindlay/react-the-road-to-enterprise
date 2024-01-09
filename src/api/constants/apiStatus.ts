export type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

export const IDLE: ApiStatus = 'IDLE';
export const PENDING: ApiStatus = 'PENDING';
export const SUCCESS: ApiStatus = 'SUCCESS';
export const ERROR: ApiStatus = 'ERROR';

export const defaultApiStatuses: ApiStatus[] = [
  'IDLE',
  'PENDING',
  'SUCCESS',
  'ERROR',
];

export type ApiStatuses = Record<ApiStatus, ApiStatus>;

export const apiStatus: ApiStatuses = {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
};
