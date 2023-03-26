import { Movie } from "@/types/movie";
import { User } from "@/types/user";
import Token from "@/utils/token";
import client from ".";
import { EditMovieBody } from "./types/movie";

const paths = {
  getUsers: "/admin/users",
  deleteUser: (id: string) => `/admin/users/${id}`,
  pickPremium: (id: string) => `/admin/users/${id}`,
  postMovie: "/admin/movie",
  editMovie: (id: string) => `/admin/movie/${id}`,
  stats: "admin/stats",
};

const getUsers = async () => {
  const token = Token.get();
  const response = await client.get<Array<User>>(paths.getUsers, {
    headers: { Authorization: `Bearer: ${token}` },
  });
  return response.data;
};

const deleteUser = async (id: string) => {
  const token = Token.get();
  const response = await client.delete<{ msg: string; id: string }>(
    paths.deleteUser(id),
    {
      headers: { Authorization: `Bearer: ${token}` },
    }
  );
  return response.data;
};

const pickPremium = async (id: string) => {
  const token = Token.get();
  const response = await client.put<{ msg: string; id: string }>(
    paths.pickPremium(id),
    {},
    {
      headers: { Authorization: `Bearer: ${token}` },
    }
  );
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

const editMovie = async ({ id, body }: { id: string; body: EditMovieBody }) => {
  const token = Token.get();
  const response = await client.put<Movie>(paths.editMovie(id), body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getStats = async () => {
  const token = Token.get();
  const response = await client.get<{
    registrations: Array<[string, number]>;
    watched: Array<[string, number]>;
  }>(paths.stats, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const admin = {
  users: {
    getUsers,
    deleteUser,
    pickPremium,
  },
  movies: {
    addMovie,
    editMovie,
  },
  getStats,
};

export default admin;
