import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";

interface AuthStore {
  user: User;
  isAuthenticated: boolean;
  setUser: (newUser: User) => void;
  clearIsAuthenticated: () => void;
}

const initialUser: User = {
  email: "",
  username: "",
  avatar: "",
};

export const useUserStore = create<AuthStore>()(
  persist(
    (set) => {
      return {
        user: initialUser,
        isAuthenticated: false,
        setUser: (newUser: User) =>
          set({ user: newUser, isAuthenticated: true }),
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
