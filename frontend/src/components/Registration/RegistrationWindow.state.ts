import axios from "axios";
import { useState } from "react";
import { useLoginActions, useRegistrationActions } from "../../hooks/usePopupStore";
import { useNotificationsActions } from "../../hooks/useNotificationStore";

export const useRegistrationWindow = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setNotification } = useNotificationsActions();
  const setLoginWindowOpen = useLoginActions();
  const setRegistrationWindowOpen = useRegistrationActions();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      return;
    }
    axios
      .post("https://localhost:7161/api/user/register", { name, login, password })
      .then(() => {
        setNotification("Registration successful");
      })
      .catch((error) => {
        setNotification("Error during registration");
      });
  };

  const close = () => setRegistrationWindowOpen(false);

  const handleCancel = () => {
    setName("");
    setLogin("");
    setPassword("");
    setConfirmPassword("");
    setNotification("");
  };

  const setAuthorization = () => {
    setRegistrationWindowOpen(false);
    setLoginWindowOpen(true);
  };

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
