import { User } from "@/types/user";

export interface RegistrationRequestBody extends User {
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
  user: User;
}
