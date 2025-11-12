import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

const initialUser: User = {
  email: "",
  username: "",
  avatar: "",
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => {
      return {
        user: initialUser,
        isAuthenticated: false,
        setUser: (user: User) => set({ user: user, isAuthenticated: true }),
        clearIsAuthenticated: () =>
          set({ user: initialUser, isAuthenticated: false }),
      };
    },
    {
      name: "auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
