import { BASE_URL } from "@/api";

const getMediaPath = (subPath: string) => {
  return BASE_URL + subPath;
};

export default getMediaPath;
