import { RegistrationWindow } from "./components/Registration/RegistrationWindow";
import { LoginWindow } from "./components/Login/LoginWindow";
import { LoginOrRegistrationWindow } from "./components/LoginOrRegistrationWindow/LoginOrRegistrationWindow";
import { UserProfileWindow } from "./components/UserProfile/UserProfile";
import { AddingRecipeCardWindow } from "./components/AddingRecipeWindow/AddingRecipeWindow";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { WebApi, WebApiProvider } from "./WebApi";
import { RecipeDetail } from "./components/RecipeCard/RecipeDetail/RecipeDetailWindow";

export const App = () => {
  return (
    <WebApiProvider value={WebApi.create()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<LoginOrRegistrationWindow />} />
          <Route path="/auth/login" element={<LoginWindow />} />
          <Route path="/auth/register" element={<RegistrationWindow />} />
          <Route path="/profile" element={<UserProfileWindow />} />
          <Route path="/add-recipe" element={<AddingRecipeCardWindow />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </BrowserRouter>
    </WebApiProvider>
  );
};

export default App;
