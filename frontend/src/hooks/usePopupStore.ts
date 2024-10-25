import { create } from "zustand";

interface PopupState {
  isRegistrationWindowOpen: boolean;
  isLoginWindowOpen: boolean;
  isLoginOrRegistrWindowOpen: boolean;
  isRecipeWindowOpen: boolean;
  actions: {
    setRegistrationWindowOpen: (isOpen: boolean) => void;
    setLoginWindowOpen: (isOpen: boolean) => void;
    setLoginOrRegistrWindowOpen: (isOpen: boolean) => void;
    setRecipeWindowOpen: (isOpen: boolean) => void;
  };
}

export const usePopupStore = create<PopupState>()((set) => ({
  isRegistrationWindowOpen: false,
  isLoginWindowOpen: false,
  isLoginOrRegistrWindowOpen: true,
  isRecipeWindowOpen: false,
  actions: {
    setRegistrationWindowOpen: (isOpen: boolean) => set({ isRegistrationWindowOpen: isOpen }),
    setLoginWindowOpen: (isOpen: boolean) => set({ isLoginWindowOpen: isOpen }),
    setLoginOrRegistrWindowOpen: (isOpen: boolean) => set({ isLoginOrRegistrWindowOpen: isOpen }),
    setRecipeWindowOpen: (isOpen: boolean) => set({ isLoginOrRegistrWindowOpen: isOpen }),
  },
}));

export const useRegistrationActions = () => usePopupStore((state) => state.actions.setRegistrationWindowOpen);
export const useLoginActions = () => usePopupStore((state) => state.actions.setLoginWindowOpen);
export const useLoginOrRegistrActions = () => usePopupStore((state) => state.actions.setLoginOrRegistrWindowOpen);
export const useRecipeActions = () => usePopupStore((state) => state.actions.setRecipeWindowOpen);

export const RegistrWindowState = () => usePopupStore((state) => state.isRegistrationWindowOpen);
export const LoginWindowState = () => usePopupStore((state) => state.isLoginWindowOpen);
export const LoginOrRegistrState = () => usePopupStore((state) => state.isLoginOrRegistrWindowOpen);
export const RecipeState = () => usePopupStore((state) => state.isRecipeWindowOpen);
