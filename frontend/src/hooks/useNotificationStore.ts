import { create } from "zustand";

interface NotificationState {
  notification: string;
  actions: {
    setNotification: (message: string) => void;
  };
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notification: ``,
  actions: {
    setNotification: (message: string) => set({ notification: message }),
  },
}));

export const useNotificationsActions = () => useNotificationStore((state) => state.actions);
