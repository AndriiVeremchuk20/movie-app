import Token from "@/utils/token";
import client from ".";
import { AvatarResponse } from "./types/avatar";

const paths = {
  main: "media/comments",
};

const post = async (body :any) => {
  const token = Token.get();
  const response = await client.post<any>(paths.main, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const commentApi = {
  post,
};

export default commentApi;
