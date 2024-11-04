import { useParams } from "react-router-dom";
import styles from "./RecipeDetailWindow.module.scss";
import { useRecipeDetail } from "./RecipeDetail.state";

export const RecipeDetail = () => {
  const { id } = useParams();
  const {
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
    close,
  } = useRecipeDetail(Number(id));

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.login}>
        <span className={styles.exitButtonContainer}>
          <button onClick={close} className={styles.exitButton}>
            Назад
          </button>
        </span>
        <div className={styles.authHeader}>
          <h3>{isEditing ? "Редактировать Рецепт" : "Рецепт"}</h3>
        </div>
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditRecipe();
            }}
          >
            <div className={styles.recipeContent}>
              <div className={styles.uploadContainer}>
                <input type="file" className={styles.recipeImg} accept="image/*" onChange={onImageUpload} />
                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className={styles.recipeImgPreview} />}
              </div>
              <div className={styles.textFields}>
                <input
                  type="text"
                  name="name"
                  placeholder="Название рецепта"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  placeholder="Краткое описание рецепта (150 символов)"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={150}
                  name="description"
                  required
                />
                <input
                  type="text"
                  placeholder="Добавить теги"
                  value={formData.tags.map((tag) => tag.name).join(", ")}
                  onChange={onTagChange}
                />
                <div className={styles.extraInfo}>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Время готовки"
                      value={formData.cookTime}
                      name="cookTime"
                      onChange={handleInputChange}
                      required
                    />
                    <span>Минут</span>
                  </div>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      name="portionCount"
                      value={formData.portionCount}
                      onChange={handleInputChange}
                      required
                    />
                    <span>Персон</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.recipeContent}>
              <div className={styles.ingredients}>
                <h4>Ингредиенты</h4>
                {formData.ingredients.map((ingredient, index) => (
                  <div className={styles.ingredient} key={index}>
                    <input
                      type="text"
                      placeholder="Заголовок для ингредиента"
                      value={ingredient.title}
                      onChange={ingredientTitle(index)}
                      required
                    />
                    <textarea
                      placeholder="Список продуктов для категории"
                      value={ingredient.description}
                      onChange={ingredientDescription(index)}
                    />
                    <button type="button" onClick={() => onRemoveIngredient(index)}>
                      &times;
                    </button>
                  </div>
                ))}
                <button type="button" onClick={onAddIngredient}>
                  Добавить заголовок
                </button>
              </div>
              <div className={styles.steps}>
                {formData.steps.map((step, index) => (
                  <div className={styles.step} key={index}>
                    <h4>Шаг {index + 1}</h4>
                    <textarea
                      placeholder="Описание шага"
                      value={step.stepDescription}
                      onChange={StepsChange(index)}
                      required
                    />
                    <button type="button" onClick={() => onRemoveStep(index)}>
                      &times;
                    </button>
                  </div>
                ))}
                <button type="button" onClick={onAddStep}>
                  Добавить шаг
                </button>
              </div>
            </div>
            <div>
              <button type="submit">Сохранить</button>
              <button type="button" onClick={handleCancel}>
                Отмена
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className={styles.recipeImg}>
              <img src={recipe?.imageUrl} alt={recipe?.name} className={styles.recipeImgPreview} />
            </div>
            <div>
              <h2>{recipe?.name}</h2>
              <p>
                <strong>Описание:</strong> {recipe?.description}
              </p>
              <p>
                <strong>Теги:</strong> {recipe?.tags.map((tag) => tag.name).join(", ")}
              </p>
              <div>
                <div>
                  <p>
                    <strong>Время приготовления:</strong> {recipe?.cookTime} минут
                  </p>
                </div>
                <div className={styles.inputGroup}>
                  <p>
                    <strong>Рецепт на: </strong>
                    {recipe?.portionCount} Персон
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.recipeContent}>
              <div className={styles.ingredients}>
                <h4>Ингредиенты:</h4>
                <ul>
                  {recipe?.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <strong>{ingredient.title}:</strong> {ingredient.description}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.steps}>
                {recipe?.steps.map((step, index) => (
                  <li key={index}>
                    <strong>Шаг {index + 1}:</strong> {step.stepDescription}
                  </li>
                ))}
              </div>
            </div>
            <button onClick={() => setIsEditing(true)}>Редактировать</button>
          </div>
        )}
      </div>
    </div>
  );
};
