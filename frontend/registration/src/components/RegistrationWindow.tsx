import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../hooks/useStore";

export const RegistrationWindow = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setNotification = useStore((state) => state.setNotification);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      return;
    }
  };

  const handleCancel = () => {
    setName("");
    setLogin("");
    setPassword("");
    setConfirmPassword("");
    setNotification("");
  };

  return (
    <div className="registration">
      <span className="exitButtonContainer">
        <button onClick={handleCancel} className="exitButton">
          Выйти
        </button>
      </span>
      <span className="registrationHeader">
        <h3>Регистрация</h3>
      </span>
      <span className="registrationFormContainer">
        <form
          className="registrationForm"
          onSubmit={(e) => {
            handleRegister();
          }}
        >
          <input
            type="text"
            placeholder="Имя"
            className="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Логин"
            className="loginInput"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <span className="PasswordsContainer">
            <span className="PasswordsBlock">
              <input
                type="Password"
                placeholder="Пароль"
                className="passwordInput"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="passwordSubtext">Минимум 8 символов</p>

              <input
                type="Password"
                placeholder="Повторите пароль"
                className="ConfirmPasswordInput"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </span>
          </span>
          <span className="RegistrationButton">
            <button type="submit" className="submitButton">
              Зарегистрироваться
            </button>
            <button type="reset" onClick={handleCancel} className="resetButton">
              Отмена
            </button>
          </span>
        </form>
      </span>
      <button className="authLink" disabled>
        У меня уже есть аккаунт
      </button>
    </div>
  );
};
