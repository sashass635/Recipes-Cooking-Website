import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const useRecipeDetail = (id: number) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const handleRecipe = () => {
      const token = Cookies.get("CookiesToken");
      if (!token) {
        console.error("Token not found");
        return;
      }
      axios
        .get(`https://localhost:7161/api/recipes/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setRecipe(response.data);
        });
    };
    handleRecipe();
  }, [id]);

  return { recipe };
};
