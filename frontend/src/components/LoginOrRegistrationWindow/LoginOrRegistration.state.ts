import { useLoginActions, useLoginOrRegistrActions, useRegistrationActions } from "../../hooks/usePopupStore";

export const useLoginOrRegistrationWindow = () => {
  const setLoginOrRegistrWindowOpen = useLoginOrRegistrActions();
  const setLoginWindowOpen = useLoginActions();
  const setRegistrationWindowOpen = useRegistrationActions();

  const openLoginWindow = () => {
    setLoginOrRegistrWindowOpen(false);
    setLoginWindowOpen(true);
  };

  const openRegistrationWindow = () => {
    setLoginOrRegistrWindowOpen(false);
    setRegistrationWindowOpen(true);
  };
  const close = () => setLoginOrRegistrWindowOpen(false);

  return { close, openLoginWindow, openRegistrationWindow };
};
