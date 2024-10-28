import { useAddingRecipeCardWindow } from "./AddingRecipeWindow.state";
import styles from "./AddingRecipeWindow.module.scss";

export const AddingRecipeCardWindow = () => {
  const {
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
    onAddIngredient,
    onRemoveIngredient,
    onAddStep,
    onRemoveStep,
    imagePreview,
    onImageUpload,
    handleStepsChange,
    ingredientTitle,
    ingredientDescription,
  } = useAddingRecipeCardWindow();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.login}>
        <span className={styles.exitButtonContainer}>
          <button onClick={close} className={styles.exitButton}>
            Назад
          </button>
        </span>
        <div className={styles.authHeader}>
          <h3>Добавить новый рецепт</h3>
        </div>

        <form onSubmit={submit}>
          <button className={styles.buttonHeader} type="submit">
            Опубликовать
          </button>
          <div className={styles.recipeContent}>
            <input type="file" className={styles.recipeImg} accept="image/*" onChange={onImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" className={styles.recipeImgPreview} />}
            <div className={styles.textFields}>
              <input type="text" placeholder="Название рецепта" value={name} onChange={onNameChange} required />
              <textarea
                placeholder="Краткое описание рецепта (150 символов)"
                value={description}
                onChange={onDescriptionChange}
                maxLength={150}
                required
              />
              <input type="text" placeholder="Добавить теги" value={tags.join(",")} onChange={onTagChange} />
              <div className={styles.extraInfo}>
                <div className={styles.inputGroup}>
                  <input
                    type="number"
                    placeholder="Время готовки"
                    value={cookTime}
                    onChange={onCookTimeChange}
                    required
                  />
                  <span>Минут</span>
                </div>
                <div className={styles.inputGroup}>
                  <input type="number" value={portionCount} onChange={onPortionCountChange} required />
                  <span>Персон</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.recipeContent}>
            <div className={styles.ingredients}>
              <h4>Ингредиенты</h4>
              {ingredients.map((ingredient, index) => (
                <div className={styles.ingredient} key={index}>
                  <input
                    type="text"
                    placeholder="Заголовок для ингредиента"
                    value={ingredient.title}
                    onChange={() => ingredientTitle}
                    required
                  />
                  <textarea
                    placeholder="Список продуктов для категории"
                    value={ingredient.description}
                    onChange={() => ingredientDescription}
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
              {steps.map((step, index) => (
                <div className={styles.step} key={index}>
                  <h4>Шаг {index + 1}</h4>
                  <textarea
                    placeholder="Описание шага"
                    value={step.stepDescription}
                    onChange={handleStepsChange(index)}
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
        </form>
      </div>
    </div>
  );
};
