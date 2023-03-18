export interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarPath: string | null;
}

export interface User extends BaseUser {
  age: number;
  role: Role;
  email: string;
  likes: Array<string>;
  vieved: Array<string>;
  watchLater: Array<string>;
  isPremium: boolean;
}

export enum Role {
  admin = "ADMIN",
  user = "USER",
}
