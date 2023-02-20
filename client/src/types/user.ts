export interface User {
  firstName: string;
  lastName: string;
  age: Number;
  email: string;
  likes: Array<string>;
  vieved: Array<string>;
  watchLater: Array<string>;
  avatarPath: string|null; 
}
