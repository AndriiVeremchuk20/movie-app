import {
  LoginRequestBody,
  LoginResponseData,
  RegistrationRequestBody,
  ResponseMessage,
} from "./types/auth";
import client from ".";
import Token from "@/utils/token";

const paths = {
  registration: "/user/registration",
  login: "/user/login",
  auth: "/user/auth",
  delete: "/user/",
};

const registration = async (body: RegistrationRequestBody) => {
  const response = await client.post<ResponseMessage>(paths.registration, body);
  return response.data;
};

const login = async (body: LoginRequestBody) => {
  const response = await client.post<LoginResponseData>(paths.login, body);
  Token.set(response.data.token);
  return response.data;
};

const authentication = async () => {
  const token = Token.get();
  const response = await client.get<LoginResponseData>(paths.auth, {
    headers: { Authorization: `Bearer ${token}` },
  });
  Token.set(response.data.token);
  return response.data;
};

const deleteAccount = async () => {
  const token = Token.get();
  const response = await client.delete<ResponseMessage>(paths.delete, {
    headers: { Authorization: `Bearer ${token}` },
  });
  Token.clear();
  return response.data;
};

const auth = {
  registration,
  login,
  authentication,
  deleteAccount,
};

export default auth;
