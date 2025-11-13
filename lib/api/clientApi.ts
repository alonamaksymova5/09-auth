import { ALL_NOTES } from "../constants";
import type { NewNote, Note } from "../../types/note";
import type { User } from "@/types/user";
import { api } from "./api";

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

  const res = await api.get<NotesResponse>("/notes", {
    params,
  });
  console.log("Response data for", tag, res.data);

  return res.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${noteId}`);
  return res.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const res = await api.post("/notes", newNote);
  return res.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${noteId}`);
  return res.data;
}

//функція для запиту на реєстрацію нового користувача

export type RegisterRequest = {
  email: string;
  password: string;
};

export async function register(data: RegisterRequest): Promise<User> {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const res = await api.get<User>("/auth/session");
  return res.data || null;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (data: {
  email?: string;
  username?: string;
  avatar?: string;
}): Promise<User> => {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
};
