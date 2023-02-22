export interface BaseUser{ 
  id: string;
  firstName: string;
  lastName: string;
  avatarPath: string | null;
}

export interface User extends BaseUser {
  age: Number;
  email: string;
  likes: Array<string>;
  vieved: Array<string>;
  watchLater: Array<string>;
}
