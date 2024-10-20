import { useState } from "react";
import axios from "axios";
import { useStore } from "../hooks/useStore";
import styles from "./RegistrationWindow.module.scss";

export const RegistrationWindow = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setNotification = useStore((state) => state.setNotification);
  const setLoginWindowOpen = useStore((state) => state.setLoginWindowOpen);
  const setRegistrationWindowOpen = useStore((state) => state.setRegistrationWindowOpen);

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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.registration}>
        <span className={styles.exitButtonContainer}>
          <button
            onClick={() => {
              setRegistrationWindowOpen(false);
            }}
            className={styles.exitButton}
          >
            &times;
          </button>
        </span>
        <span className={styles.registrationHeader}>
          <h3>Регистрация</h3>
        </span>
        <span className={styles.registrationFormContainer}>
          <form
            className={styles.registrationForm}
            onSubmit={(e) => {
              handleRegister();
              e.preventDefault();
            }}
          >
            <span className={styles.LoginBlock}>
              <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
            </span>
            <span className={styles.LoginBlock}>
              <input
                type="text"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </span>
            <span className={styles.PasswordsContainer}>
              <span className={styles.PasswordsBlock}>
                <input
                  type="Password"
                  placeholder="Пароль"
                  className={styles.passwordInput}
                  value={password}
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className={styles.passwordSubtext}>Минимум 8 символов</p>
              </span>
              <span className={styles.PasswordsBlock}>
                <input
                  type="Password"
                  placeholder="Повторите пароль"
                  className={styles.confirmPasswordInput}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </span>
            </span>
            <span className={styles.RegistrationButtons}>
              <button type="submit" className={styles.submitButton}>
                Зарегистрироваться
              </button>
              <button type="reset" onClick={handleCancel} className={styles.resetButton}>
                Отмена
              </button>
            </span>
          </form>
        </span>
        <button className={styles.authLink} onClick={setAuthorization}>
          У меня уже есть аккаунт
        </button>
      </div>
    </div>
  );
};
