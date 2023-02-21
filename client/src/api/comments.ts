import { Comment } from "@/types/comment";
import Token from "@/utils/token";
import client from ".";
import { CommentReqBody } from "./types/comment";

const paths = {
  main: "user/comments",
};

const post = async (body: CommentReqBody) => {
  const token = Token.get();
  const response = await client.post<Comment>(paths.main, body, {
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
