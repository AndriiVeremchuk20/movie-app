import { User } from "@/types/user";
import Token from "@/utils/token";
import client from ".";

const paths = {
  getUsers: "/admin/users",
  deleteUser: (id: string) => `/admin/users/${id}`,
  postMovie: "/admin/movie",
};

const getUsers = async () => {
  const token = Token.get();
  const response = await client.get<Array<User>>(paths.getUsers, {
      headers: {Authorization: `Bearer: ${token}`}
  });
  return response.data;
};

const deleteUser = async (id: string) => {
  const token = Token.get();
  const response = await client.delete<{msg: string, id: string}>(paths.deleteUser(id), {
      headers: {Authorization: `Bearer: ${token}`}
  });
  return response.data;
}; 

const addMovie = async (body: FormData) => {
  const token = Token.get();
  const response = await client.post<any>(paths.postMovie, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const admin = {
  getUsers,
  addMovie,
  deleteUser,
};

export default admin;
