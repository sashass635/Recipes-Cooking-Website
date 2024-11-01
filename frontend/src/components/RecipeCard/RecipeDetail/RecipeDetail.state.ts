import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Recipe = {
  name: string;
  description: string;
  cookTime: number;
  portionCount: number;
  imageUrl: string;
  ingredients: { title: string; description: string }[];
  steps: { stepDescription: string }[];
  tags: { name: string }[];
};

type RecipeUpdate = {
  name: string;
  description: string;
  cookTime: number;
  portionCount: number;
  imageUrl: string;
  ingredients: { title: string; description: string }[];
  steps: { stepDescription: string }[];
  tags: { name: string }[];
};

export const useRecipeDetail = (id: number) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<RecipeUpdate>({
    name: "",
    description: "",
    cookTime: 0,
    portionCount: 0,
    imageUrl: "",
    ingredients: [{ title: "", description: "" }],
    steps: [{ stepDescription: "" }],
    tags: [{ name: "" }],
  });
  const navigate = useNavigate();

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
          setFormData({ ...formData, ...response.data });
        });
    };
    handleRecipe();
  }, [id]);

  const handleEditRecipe = () => {
    const token = Cookies.get("CookiesToken");

    axios
      .put(`https://localhost:7161/api/recipes/update/${id}`, formData, {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Failed to update recipe", error);
      });
  };

  const handleCancel = () => {
    if (recipe) {
      setFormData({ ...formData, ...recipe });
    }
    setIsEditing(false);
  };

  return { recipe, handleEditRecipe, handleCancel };
};
