import Token from "@/utils/token";
import client from ".";
import { AvatarResponse } from "./types/avatar";

const paths = {
  main: "/avatar",
};

const edit = async (body: FormData) => {
  const token = Token.get();
  const response = await client.post<AvatarResponse>(paths.main, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const remove = async () => {
  const token = Token.get();
  const response = await client.delete<any>(paths.main, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const avatarApi = {
  edit,
  remove
};

export default avatarApi;
