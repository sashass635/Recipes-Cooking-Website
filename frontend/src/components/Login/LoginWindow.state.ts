import { useState } from "react";
import axios from "axios";
import { useNotificationsActions } from "../../hooks/useNotificationStore";
import { useLoginActions, useRegistrationActions } from "../../hooks/usePopupStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useWebApi } from "../../WebApi";

export const useLoginWindow = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setNotification } = useNotificationsActions();
  const setLoginWindowOpen = useLoginActions();
  const setRegistrationWindowOpen = useRegistrationActions();
  const navigate = useNavigate();
  const api = useWebApi();

  const handleLogin = () => {
    api
      .login(login, password)
      .then((response) => {
        const token = response.data.token || response.data;
        if (!token) {
          console.error("Token is missing in the response");
          return;
        }
        Cookies.set("CookiesToken", response.data);
        console.log("Token saved:", response.data);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Invalid login or password", error);
      });
  };

  const handleCancel = () => {
    setLogin("");
    setPassword("");
  };

  const setRegistration = () => navigate("/auth/register");

  const close = () => navigate("/profile");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value);

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  return { handleCancel, close, setRegistration, submit, login, onLoginChange, onPasswordChange, password };
};
