import { useLoginOrRegistrationWindow } from "./LoginOrRegistration.state";
import styles from "./LoginOrRegistrationWindow.module.scss";

export const LoginOrRegistrationWindow = () => {
  const { close, openLoginWindow, openRegistrationWindow } = useLoginOrRegistrationWindow();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authContainer}>
        <span className={styles.exitButtonContainer}>
          <button onClick={close} className={styles.exitButton}>
            &times;
          </button>
        </span>
        <span className={styles.authFormContainer}>
          <h3 className={styles.authHeader}>Войдите в профиль</h3>
          <p className={styles.authDescription}>Добавлять рецепты могут только зарегистрированные пользователи.</p>
          <div className={styles.authForm}>
            <span className={styles.buttons}>
              <button onClick={openLoginWindow} className={styles.loginButton}>
                Войти
              </button>
              <button onClick={openRegistrationWindow} className={styles.registrButton}>
                Регистрация
              </button>
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};
