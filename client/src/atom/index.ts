import { User } from "@/types/user";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { Movie, MovieAllInfo } from "@/types/movie";

export const appUserAtom = atom<User | null>(null);
export const moviesAtom = atom<Array<Movie>>([]);
export const currentMovieAtom = atom<MovieAllInfo | null>(null);
export const darkModeAtom = atomWithStorage<boolean>("isDark", true);
