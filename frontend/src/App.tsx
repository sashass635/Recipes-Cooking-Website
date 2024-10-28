import { RegistrationWindow } from "./components/Registration/RegistrationWindow";
import { LoginWindow } from "./components/Login/LoginWindow";
import { LoginOrRegistrationWindow } from "./components/LoginOrRegistrationWindow/LoginOrRegistrationWindow";
import { LoginOrRegistrState, LoginWindowState, RecipeState, RegistrWindowState } from "./hooks/usePopupStore";
import { UserProfileWindow } from "./components/UserProfile/UserProfile";
import { AddingRecipeCardWindow } from "./components/AddingRecipeWindow/AddingRecipeWindow";
import { RecipeListWindow } from "./components/RecipeCard/RecipeList/RecipeList";

export const App = () => {
  const isRegistrationWindowOpen = RegistrWindowState();
  const isLoginWindowOpen = LoginWindowState();
  const isLoginOrRegistrWindowOpen = LoginOrRegistrState();

  return (
    <div>
      {isLoginOrRegistrWindowOpen ? (
        <LoginOrRegistrationWindow />
      ) : isLoginWindowOpen ? (
        <LoginWindow />
      ) : isRegistrationWindowOpen ? (
        <RegistrationWindow />
      ) : (
        <RecipeListWindow />
      )}
    </div>
  );
};

export default App;
