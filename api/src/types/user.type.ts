export interface User {
  email: string;
  password: string;
  roles: string[];
  name?: string;
  date_of_birth?: string;
  address?: string;
  phone?: string;
  avatar?: string;
  [key: string]: any;
}
