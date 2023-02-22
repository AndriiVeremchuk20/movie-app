import { BaseUser } from "./user";

export interface BaseComment {
  id: string;
  text: string;
  posted_at: string;
}

export interface Comment extends BaseComment {
  User: BaseUser;
}
