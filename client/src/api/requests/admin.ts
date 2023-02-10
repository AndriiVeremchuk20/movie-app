import { User } from "@/types/user";
import client from ".";

const paths = {
  getUsers: "/admin/users",
};

const getUsers =async () => {
    const response = await client.get<Array<User>>(paths.getUsers);
    return response.data;
}

//   const registration = async (body: RegistrationRequestBody) => {
//     const response = await client.post<ResponseMessage>(paths.registration, body);
//     return response.data;
//   };

//   const login = async (body: LoginRequestBody) => {
//     const response = await client.post<LoginResponseData>(paths.login, body);
//     Token.set(response.data.token);
//     return response.data;
//   };

//   const authentication = async () => {
//     const token = Token.get();
//     const response = await client.get<LoginResponseData>(paths.auth, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     Token.set(response.data.token);
//     return response.data;
//   };

const admin = {
    getUsers,
};

export default admin;
