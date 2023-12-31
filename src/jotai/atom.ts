import { userData } from "@/types/types";
import { atom } from "jotai";

export const keyHolder = atom(1);

export const allUserData = atom<userData[]>([]);

export const currentDisease = atom<string>("");

export const cursorVariant = atom<string>("default");

export const isDark = atom<boolean>(false);
