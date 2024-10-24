import { useState } from "react";
import axios from "axios";
import { useNotificationsActions, useNotificationStore, useStore } from "../hooks/useStore";

export const useLoginWindow = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {setNotification} = useNotificationsActions();
  const setLoginWindowOpen = useStore((state) => state.setLoginWindowOpen);
  const setRegistrationWindowOpen = useStore((state) => state.setRegistrationWindowOpen);

  const handleLogin = () => {
    axios
      .post("https://localhost:7161/api/user/login", { login, password })
      .then(() => {
        setNotification("Login successful");
      })
      .catch(() => {
        setNotification("Invalid login or password");
      });
  };

  const handleCancel = () => {
    setLogin("");
    setPassword("");
  };

  const setRegistration = () => {
    setRegistrationWindowOpen(true);
    setLoginWindowOpen(false);
  };

  const close = () => setLoginWindowOpen(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  }

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value);

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  return { handleCancel,close, setRegistration, submit, login, onLoginChange, onPasswordChange, password };
};