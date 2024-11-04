import { useNavigate } from "react-router-dom";
import { RecipeCard } from "../RecipeCard";
import { useRecipeList } from "./RecipeList.state";

export const RecipeListWindow = () => {
  const { recipes } = useRecipeList();

  const navigate = useNavigate();

  const handleRecipeClick = (id: number) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div className="recipeList">
      <h2>Мои рецепты</h2>
      {recipes.length === 0 ? (
        <p>Нет рецептов</p>
      ) : (
        <ul className="recipeListItems">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipeListItem" onClick={() => handleRecipeClick(recipe.id)}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
