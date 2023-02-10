import { User } from "@/types/user";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { Movie } from "@/api/types/movie";

export const appUserAtom = atom<User | null>(null);
export const moviesAtom = atom<Array<Movie>>([]);
export const darkModeAtom = atomWithStorage<boolean>("isDark", true);