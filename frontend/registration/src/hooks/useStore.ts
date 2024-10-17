import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  notification: string;
  setNotification: (message: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      notification: "",
      setNotification: (message) => set({ notification: message }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ notification: state.notification }),
    },
  ),
);
