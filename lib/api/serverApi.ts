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

  const res = await api.get<NotesResponse>("/notes", {
    params,
  });
  return res.data;
}

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = cookies();
  const { data } = await api.get<Note>(`/notes/${noteId}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = cookies();
  try {
    const res = await api.get("/auth/session", {
      headers: { Cookie: cookieStore.toString() },
    });
    return res;
  } catch {
    return null;
  }
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
