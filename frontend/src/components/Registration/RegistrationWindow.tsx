import styles from "./RegistrationWindow.module.scss";
import { useRegistrationWindow } from "./RegistrationWindow.state";

export const RegistrationWindow = () => {
  const {
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
  } = useRegistrationWindow();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.registration}>
        <span className={styles.exitButtonContainer}>
          <button onClick={close} className={styles.exitButton}>
            &times;
          </button>
        </span>
        <span className={styles.registrationHeader}>
          <h3>Регистрация</h3>
        </span>
        <span className={styles.registrationFormContainer}>
          <form className={styles.registrationForm} onSubmit={submit}>
            <span className={styles.LoginBlock}>
              <input type="text" placeholder="Имя" value={name} onChange={onNameChange} required />
            </span>
            <span className={styles.LoginBlock}>
              <input type="text" placeholder="Логин" value={login} onChange={onLoginChange} required />
            </span>
            <span className={styles.PasswordsContainer}>
              <span className={styles.PasswordsBlock}>
                <input
                  type="Password"
                  placeholder="Пароль"
                  className={styles.passwordInput}
                  value={password}
                  minLength={8}
                  onChange={onPasswordChange}
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
                  onChange={onConfirmPassword}
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
