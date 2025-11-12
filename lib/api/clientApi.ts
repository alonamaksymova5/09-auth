import axios from "axios";
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

  const res = await axios.get<NotesResponse>("/notes", {
    params,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  console.log("Response data for", tag, res.data);

  return res.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const res = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const res = await axios.post("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
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

//функція для запиту на автентифікацію користувача

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

//функція перевірки активної сесії

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}; //promise?

//функція отримання свого профілю

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};
