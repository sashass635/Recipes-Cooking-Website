import { RegistrationWindow } from "./components/Registration/RegistrationWindow";
import { LoginWindow } from "./components/Login/LoginWindow";
import { LoginOrRegistrationWindow } from "./components/LoginOrRegistrationWindow/LoginOrRegistrationWindow";
import { LoginOrRegistrState, LoginWindowState, RecipeState, RegistrWindowState } from "./hooks/usePopupStore";
import { RecipeCardWindow } from "./components/RecipeCard/RecipeCard";

export const App = () => {
  const isRegistrationWindowOpen = RegistrWindowState();
  const isLoginWindowOpen = LoginWindowState();
  const isLoginOrRegistrWindowOpen = LoginOrRegistrState();
  const isRecipeWindowOpen = RecipeState();

  return (
    <div>
      {isLoginOrRegistrWindowOpen ? (
        <LoginOrRegistrationWindow />
      ) : isLoginWindowOpen ? (
        <LoginWindow />
      ) : isRegistrationWindowOpen ? (
        <RegistrationWindow />
      ) : (
        <RecipeCardWindow />
      )}
    </div>
  );
};

export default App;
