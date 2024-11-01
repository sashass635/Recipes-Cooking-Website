import axios from "axios";
import { useState } from "react";
import { useLoginActions, useRegistrationActions } from "../../hooks/usePopupStore";
import { useNotificationsActions } from "../../hooks/useNotificationStore";
import { useNavigate } from "react-router-dom";
import { useWebApi } from "../../WebApi";

export const useRegistrationWindow = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setNotification } = useNotificationsActions();
  const setLoginWindowOpen = useLoginActions();
  const setRegistrationWindowOpen = useRegistrationActions();
  const navigate = useNavigate();
  const api = useWebApi();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      return;
    }
    api
      .register(name, login, password)
      .then(() => {
        setNotification("Registration successful");
        navigate("/auth/login");
      })
      .catch((error) => {
        setNotification("Error during registration");
      });
  };

  const close = () => navigate("/profile");

  const handleCancel = () => {
    setName("");
    setLogin("");
    setPassword("");
    setConfirmPassword("");
    setNotification("");
  };

  const setAuthorization = () => navigate("/auth/login");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    handleRegister();
    event.preventDefault();
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value);

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const onConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value);

  return {
    onConfirmPassword,
    onPasswordChange,
    onLoginChange,
    onNameChange,
    submit,
    close,
    confirmPassword,
    login,
    name,
    password,
    handleCancel,
    setAuthorization,
  };
};
