
export interface User {
  _id?: string;
  email?: string;
  password?: string;
  role?: string;
  address?: string;
  registrationNumber?: string;
  status?: string;
  tel?: string;
  collector?: string;
}
export interface UserDetails {
  id?: any;
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  address?: string;
  registrationNumber?: string;
  status?: string;
  tel?: string;
  ref?:any;
  collector?: string;
  lastUpdatedAt?:any
}
