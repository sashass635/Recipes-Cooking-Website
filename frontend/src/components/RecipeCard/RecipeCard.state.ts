import { useState } from "react";
import { useRecipeActions } from "../../hooks/usePopupStore";
import axios from "axios";
import Cookies from "js-cookie";

export const useRecipeCardWindow = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [portionCount, setPortionCount] = useState(1);
  const [ingredients, setIngredients] = useState([{ title: "", description: "" }]);
  const [steps, setSteps] = useState([{ stepDescription: "" }]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageFile] = useState<File | null>(null);
  const setRecipeWindowOpen = useRecipeActions();

  const handleAddRecipe = () => {
    const token = Cookies.get("CookiesToken");

    if (!token) {
      console.error("Token not found");
      return;
    }

    console.log("Authorization:", `${token}`);

    axios
      .post(
        "https://localhost:7161/api/recipes/add",
        {
          name,
          description,
          cookTime,
          portionCount,
          imageUrl: imagePreview,
          ingredients,
          steps,
          tags: tags.map((tag) => ({ name: tag })),
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => {
        console.error("Error adding recipe");
      });
  };

  const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTags(inputValue.split(",").map((tag) => tag.trim()));
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);
  const onCookTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => setCookTime(event.target.value);
  const onPortionCountChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPortionCount(Number(event.target.value));

  const onIngredientChange = (index: number, value: string, field: "title" | "description") => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setIngredients(updatedIngredients);
  };

  const onAddIngredient = () => setIngredients([...ingredients, { title: "", description: "" }]);

  const onRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.slice();
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const onStepChange = (index: number, value: string) => {
    const updatedSteps = steps.map((step, i) => (i === index ? { ...step, stepDescription: value } : step));
    setSteps(updatedSteps);
  };

  const StepsChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onStepChange(index, event.target.value);
  };

  const handleStepsChange = (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    StepsChange(index, event);
  };

  const onAddStep = () => setSteps([...steps, { stepDescription: "" }]);

  const onRemoveStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddRecipe();
  };

  const close = () => {
    setRecipeWindowOpen(false);
  };

  return {
    tags,
    onTagChange,
    submit,
    close,
    name,
    description,
    cookTime,
    portionCount,
    onNameChange,
    onDescriptionChange,
    onCookTimeChange,
    onPortionCountChange,
    ingredients,
    steps,
    onIngredientChange,
    onAddIngredient,
    onRemoveIngredient,
    handleStepsChange,
    onAddStep,
    onRemoveStep,
    imagePreview,
    onImageUpload,
  };
};
