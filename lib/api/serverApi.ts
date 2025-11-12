import axios from "axios";
import { cookies } from "next/headers";
import { api } from "./api";
import { ALL_NOTES } from "../constants";
import type { Note } from "../../types/note";
import type { User } from "@/types/user";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search: string,
  tag?: string
): Promise<NotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage,
    search,
  };

  if (tag && tag !== "all" && tag !== ALL_NOTES) {
    params.tag = tag;
  }

  const res = await axios.get<NotesResponse>("/notes", {
    params,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  console.log("Response data for", tag, res.data);

  return res.data;
}

//функція отримання однієї нотатки

export async function fetchNoteById(noteId: string): Promise<Note> {
  const res = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
}

//функція отримання свого профілю

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

//функція перевірки активної сесії

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}; //promise?

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}; //promise?
