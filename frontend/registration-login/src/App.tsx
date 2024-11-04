import { RegistrationWindow } from "./components/RegistrationWindow";
import { LoginWindow } from "./components/LoginWindow";
import { useStore } from "./hooks/useStore";
import { LoginOrRegistrationWindow } from "./components/LoginOrRegistrationWindow";

export const App = () => {
  const isRegistrationWindowOpen = useStore((state) => state.isRegistrationWindowOpen);
  const isLoginWindowOpen = useStore((state) => state.isLoginWindowOpen);
  const isLoginOrRegistrWindowOpen = useStore((state) => state.isLoginOrRegistrWindowOpen);

  return (
    <div>
      {isRegistrationWindowOpen && <RegistrationWindow />}
      {isLoginWindowOpen && <LoginWindow />}
      {isLoginOrRegistrWindowOpen && <LoginOrRegistrationWindow />}
      {!isLoginWindowOpen && !isRegistrationWindowOpen && <LoginOrRegistrationWindow />}
    </div>
  );
};

export default App;
