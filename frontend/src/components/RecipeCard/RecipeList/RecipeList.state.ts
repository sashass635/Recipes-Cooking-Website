import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

type Recipe = {
  id: number;
  name: string;
  description: string;
  cookTime: number;
  portionCount: number;
  imageUrl?: string;
  authorLogin: string;
  tags: { name: string }[];
};

export const useRecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getUserRecipes = () => {
      const token = Cookies.get("CookiesToken");
      if (!token) {
        console.error("Token not found");
        return;
      }

      axios
        .get("https://localhost:7161/api/recipes/usersRecipes", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setRecipes(response.data);
        })
        .catch((error) => {
          console.error("Error adding recipe");
        });
    };

    getUserRecipes();
  }, []);
  return {
    recipes,
  };
};
