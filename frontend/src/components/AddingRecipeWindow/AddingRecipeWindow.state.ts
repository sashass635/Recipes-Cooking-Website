import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Recipe = {
  name: string;
  description: string;
  cookTime: number;
  tags: string[];
  portionCount: number;
  ingredients: { title: string; description: string }[];
  steps: { stepDescription: string }[];
  ImageUrl: string | null;
};

export const useAddingRecipeCardWindow = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    description: "",
    cookTime: 1,
    tags: [],
    portionCount: 1,
    ingredients: [{ title: "", description: "" }],
    steps: [{ stepDescription: "" }],
    ImageUrl: null,
  });

  const navigate = useNavigate();

  const handleAddRecipe = async () => {
    const token = Cookies.get("CookiesToken");

    if (!token) {
      console.error("Token not found");
      return;
    }

    // TODO: Все запросы должны вызываться через абстракцию WebApi
    try {
      const response = await axios.post(
        "https://localhost:7161/api/recipes/add",
        {
          ...recipe,
          tags: recipe.tags.map((tag) => ({ name: tag })),
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding recipe", error);
    }
  };

  const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setRecipe((current) => ({
      ...current,
      tags: inputValue.split(",").map((tag) => tag.trim()),
    }));
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRecipe((current) => ({ ...current, name: event.target.value }));

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setRecipe((current) => ({ ...current, description: event.target.value }));

  const onCookTimeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRecipe((current) => ({ ...current, cookTime: Number(event.target.value) }));

  const onPortionCountChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRecipe((current) => ({ ...current, portionCount: Number(event.target.value) }));

  const onIngredientChange = (index: number, value: string, field: "title" | "description") => {
    setRecipe((current) => {
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

  const onAddIngredient = () =>
    setRecipe((current) => ({
      ...current,
      ingredients: [...current.ingredients, { title: "", description: "" }],
    }));

  const onRemoveIngredient = (index: number) => {
    setRecipe((current) => ({
      ...current,
      ingredients: current.ingredients.filter((_, i) => i !== index),
    }));
  };

  const onStepChange = (index: number, value: string) => {
    setRecipe((current) => {
      const updatedSteps = current.steps.map((step, i) => (i === index ? { ...step, stepDescription: value } : step));
      return { ...current, steps: updatedSteps };
    });
  };

  const StepsChange = (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onStepChange(index, event.target.value);
  };

  const onAddStep = () =>
    setRecipe((current) => ({
      ...current,
      steps: [...current.steps, { stepDescription: "" }],
    }));

  const onRemoveStep = (index: number) => {
    setRecipe((current) => ({
      ...current,
      steps: current.steps.filter((_, i) => i !== index),
    }));
  };

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe((current) => ({
          ...current,
          ImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddRecipe();
  };

  const close = () => navigate("/profile");

  return {
    recipe,
    onTagChange,
    submit,
    close,
    onNameChange,
    onDescriptionChange,
    onCookTimeChange,
    onPortionCountChange,
    onAddIngredient,
    onRemoveIngredient,
    onAddStep,
    onRemoveStep,
    onImageUpload,
    StepsChange,
    ingredientTitle,
    ingredientDescription,
    handleAddRecipe,
  };
};
