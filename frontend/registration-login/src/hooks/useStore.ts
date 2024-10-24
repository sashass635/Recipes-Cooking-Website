import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NotificationState {
  notification: string;
  actions: {
    setNotification: (message: string) => void;
  }
}

interface PopupState {
  isRegistrationWindowOpen: boolean;
  isLoginWindowOpen: boolean;
  isLoginOrRegistrWindowOpen: boolean;

  setRegistrationWindowOpen: (isOpen: boolean) => void;
  setLoginWindowOpen: (isOpen: boolean) => void;
  setLoginOrRegistrWindowOpen: (isOpen: boolean) => void;
}

interface StoreState extends PopupState {}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isRegistrationWindowOpen: false,
      setRegistrationWindowOpen: (isOpen: boolean) => set({ isRegistrationWindowOpen: isOpen }),

      isLoginWindowOpen: false,
      setLoginWindowOpen: (isOpen: boolean) => set({ isLoginWindowOpen: isOpen }),

      isLoginOrRegistrWindowOpen: true,
      setLoginOrRegistrWindowOpen: (isOpen: boolean) => set({ isLoginOrRegistrWindowOpen: isOpen }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isRegistrationWindowOpen: state.isRegistrationWindowOpen,
        isLoginWindowOpen: state.isLoginWindowOpen,
        isLoginOrRegistrWindowOpen: state.isLoginOrRegistrWindowOpen,
      }),
    },
  ),
);

export const useNotificationStore = create<NotificationState>(
  (set) => ({
    notification: ``,
    actions: {
      setNotification: (message: string) => set({ notification: message }),
    }
  })
);

export const useNotificationsActions = () => useNotificationStore((state) => state.actions);

