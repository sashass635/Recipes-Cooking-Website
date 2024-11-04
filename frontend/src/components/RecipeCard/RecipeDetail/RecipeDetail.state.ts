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
    tags: [],
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
          headers: { Authorization: token },
        })
        .then((response) => {
          const recipeData = {
            ...response.data,
          };
          setRecipe(recipeData);
          setFormData({ ...formData, ...recipeData });
          navigate(`/recipes/${id}`);
        });
    };
    handleRecipe();
  }, [id]);

  const handleEditRecipe = () => {
    const token = Cookies.get("CookiesToken");

    axios
      .put(`https://localhost:7161/api/recipes/update/${id}`, formData, {
        headers: { Authorization: `${token}` },
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
      setFormData({
        ...formData,
        ...recipe,
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((current) => ({
          ...current,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onIngredientChange = (index: number, value: string, field: "title" | "description") => {
    setFormData((current) => {
      const updatedIngredients = [...current.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
      return { ...current, ingredients: updatedIngredients };
    });
  };

  const ingredientTitle = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onIngredientChange(index, event.target.value, "title");
  };

  const ingredientDescription = (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onIngredientChange(index, event.target.value, "description");
  };

  const onRemoveIngredient = (index: number) => {
    setFormData((current) => ({
      ...current,
      ingredients: current.ingredients.filter((_, i) => i !== index),
    }));
  };

  const onAddIngredient = () =>
    setFormData((current) => ({
      ...current,
      ingredients: [...current.ingredients, { title: "", description: "" }],
    }));

  const onStepChange = (index: number, value: string) => {
    setFormData((current) => {
      const updatedSteps = current.steps.map((step, i) => (i === index ? { ...step, stepDescription: value } : step));
      return { ...current, steps: updatedSteps };
    });
  };

  const StepsChange = (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onStepChange(index, event.target.value);
  };

  const onAddStep = () =>
    setFormData((current) => ({
      ...current,
      steps: [...current.steps, { stepDescription: "" }],
    }));

  const onRemoveStep = (index: number) => {
    setFormData((current) => ({
      ...current,
      steps: current.steps.filter((_, i) => i !== index),
    }));
  };

  const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      tags: value.split(",").map((tag) => ({ name: tag.trim() })),
    });
  };

  const close = () => navigate("/profile");

  return {
    close,
    formData,
    recipe,
    handleEditRecipe,
    handleCancel,
    isEditing,
    setIsEditing,
    handleInputChange,
    onImageUpload,
    ingredientTitle,
    ingredientDescription,
    onRemoveIngredient,
    StepsChange,
    onAddStep,
    onRemoveStep,
    onTagChange,
    onAddIngredient,
  };
};
