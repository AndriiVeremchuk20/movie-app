import { User } from "@/types/user";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const appUserAtom = atom<User | null>(null);
export const darkModeAtom = atomWithStorage<boolean>("isDark", true);