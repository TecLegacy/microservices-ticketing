export type Method = 'get' | 'post';

export type ErrorType = {
  message: string;
  field?: string;
}[];

export interface CurrentUser {
  id: string;
  email: string;
  iat: number;
}
