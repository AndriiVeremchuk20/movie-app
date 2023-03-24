import { BaseUser, User } from "@/types/user";

export interface RegistrationRequestBody{
  firstName: string;
  lastName: string;
  password: string;
}

export interface ResponseMessage {
  msg: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
}

export interface AuthResponseData {
  user: User;
  token: string;
}
