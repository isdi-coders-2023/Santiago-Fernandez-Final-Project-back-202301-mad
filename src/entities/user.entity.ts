export type Role = 'admin' | 'user';

export type User = {
  id: string;
  email: string;
  passwd: string;
  firstName: string;
  lastName: string;
  role: Role;
  image: string;
  lastLogging: string;
};
