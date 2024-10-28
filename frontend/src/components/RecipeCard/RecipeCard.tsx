import React from "react";
import styles from "./RecipeCard.module.scss";

type Recipe = {
  id: number;
  name: string;
  description: string;
  cookTime: number;
  portionCount: number;
  imageUrl?: string;
  tags: { name: string }[];
};

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className={styles.recipe}>
      <img className={styles.recipeImg} src={recipe.imageUrl} alt="Recipe" />
      <span className={styles.recipeInfo}>
        <div className={styles.recipeHeader}>
          <span className={styles.recipeTags}>
            {recipe.tags && recipe.tags.length > 0 ? (
              recipe.tags.map((tag) => (
                <span key={tag.name} className={styles.recipeTag}>
                  {tag.name}
                </span>
              ))
            ) : (
              <span className={styles.recipeTag}>No tags</span>
            )}
          </span>
        </div>
        <span className={styles.recipeNameInfo}>
          <h3 className={styles.recipeName}>{recipe.name}</h3>
          <p className={styles.recipeDescription}>{recipe.description}</p>
        </span>
        <span className={styles.recipeExtras}>
          <span className={styles.extrasItem}>
            <span className={styles.extrasItemText}>
              <p className={styles.description}>Время приготовления:</p>
              <p className={styles.data}>{recipe.cookTime} минут</p>
            </span>
          </span>
          <span className={styles.extrasItem}>
            <span className={styles.extrasItemText}>
              <p className={styles.description}>Рецепт на:</p>
              <p className={styles.data}>{recipe.portionCount} персоны</p>
            </span>
          </span>
        </span>
      </span>
    </div>
  );
};
