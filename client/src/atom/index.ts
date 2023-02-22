import { User } from "@/types/user";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { Movie, BaseMovie } from "@/types/movie";

export const appUserAtom = atom<User | null>(null);
export const moviesAtom = atom<Array<BaseMovie>>([]);
export const currentMovieAtom = atom<Movie | null>(null);
export const darkModeAtom = atomWithStorage<boolean>("isDark", true);
