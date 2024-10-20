import { useState } from "react";
import axios from "axios";
import { useStore } from "../hooks/useStore";
import styles from "./LoginWindow.module.scss";

export const LoginWindow = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const setNotification = useStore((state) => state.setNotification);
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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.login}>
        <span className={styles.exitButtonContainer}>
          <button
            onClick={() => {
              setLoginWindowOpen(false);
            }}
            className={styles.exitButton}
          >
            &times;
          </button>
        </span>
        <span className={styles.loginHeader}>
          <h3>Войти</h3>
        </span>
        <span className={styles.loginFormContainer}>
          <form
            className={styles.loginForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <span className={styles.LoginBlock}>
              <input
                type="text"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </span>
            <span className={styles.LoginBlock}>
              <input
                type="Password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </span>
            <span className={styles.LoginButtons}>
              <button type="submit" className={styles.submitButton}>
                Войти
              </button>
              <button type="reset" onClick={handleCancel} className={styles.resetButton}>
                Отмена
              </button>
            </span>
          </form>
        </span>
        <button className={styles.authLink} onClick={setRegistration}>
          У меня еще нет аккаунта
        </button>
      </div>
    </div>
  );
};
