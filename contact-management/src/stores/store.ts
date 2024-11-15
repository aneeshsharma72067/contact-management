import { atom } from "jotai";
import { Contact } from "../@types/types";

export const contactsAtom = atom<Contact[]>([]);
