import { useNavigate } from "react-router-dom";
import { useLoginActions, useLoginOrRegistrActions, useRegistrationActions } from "../../hooks/usePopupStore";

export const useLoginOrRegistrationWindow = () => {
  const navigate = useNavigate();

  const openLoginWindow = () => navigate("/auth/login");

  const openRegistrationWindow = () => navigate("/auth/register");

  const close = () => navigate("/profile");
  return { close, openLoginWindow, openRegistrationWindow };
};
