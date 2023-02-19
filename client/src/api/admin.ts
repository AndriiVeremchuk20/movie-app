import { User } from "@/types/user";
import Token from "@/utils/token";
import client from ".";

const paths = {
  getUsers: "/admin/users",
  postMovie: "/admin/movie",
};

const getUsers = async () => {
  const response = await client.get<Array<User>>(paths.getUsers);
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
};

export default admin;
