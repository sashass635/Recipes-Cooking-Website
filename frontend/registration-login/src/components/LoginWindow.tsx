import styles from "./LoginWindow.module.scss";
import { useLoginWindow } from "./LoginWindow.state";

export const LoginWindow = () => {
  const { handleCancel: cancel, setRegistration: openRegistration, submit, close, login, onLoginChange, onPasswordChange, password } = useLoginWindow();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.login}>
        <span className={styles.exitButtonContainer}>
          <button
            onClick={close}
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
            onSubmit={submit}
          >
            <span className={styles.LoginBlock}>
              <input
                type="text"
                placeholder="Логин"
                value={login}
                onChange={onLoginChange}
                required
              />
            </span>
            <span className={styles.LoginBlock}>
              <input
                type="Password"
                placeholder="Пароль"
                value={password}
                onChange={onPasswordChange}
                required
              />
            </span>
            <span className={styles.LoginButtons}>
              <button type="submit" className={styles.submitButton}>
                Войти
              </button>
              <button type="reset" onClick={cancel} className={styles.resetButton}>
                Отмена
              </button>
            </span>
          </form>
        </span>
        <button className={styles.authLink} onClick={openRegistration}>
          У меня еще нет аккаунта
        </button>
      </div>
    </div>
  );
};
