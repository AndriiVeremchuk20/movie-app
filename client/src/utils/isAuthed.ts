import Token from "./token";

export const isAuthed = () => {
  return !!Token.get();
};
