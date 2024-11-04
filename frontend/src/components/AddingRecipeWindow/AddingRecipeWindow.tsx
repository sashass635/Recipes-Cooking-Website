import { useAddingRecipeCardWindow } from "./AddingRecipeWindow.state";
import styles from "./AddingRecipeWindow.module.scss";
import * as Yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

export const AddingRecipeCardWindow = () => {
  const {
    recipe,
    onTagChange,
    close,
    submit,
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
  } = useAddingRecipeCardWindow();

  const recipeSchema = Yup.object().shape({
    name: Yup.string().min(2, "Минимум 2 символа").max(100, "Максимум 100 символов").required("Обязательное поле"),
    description: Yup.string().max(200).required("Обязательное поле"),
    cookTime: Yup.number().positive("Время должно быть положительным").required("Обязательное поле"),
    portionCount: Yup.number()
      .min(1)
      .positive("Количество порций должно быть положительным")
      .required("Обязательное поле"),
    tags: Yup.array().of(Yup.string().min(2, "Минимум 2 символа")),
    ingredients: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Название ингредиента обязательно"),
        description: Yup.string().optional(),
      }),
    ),
    steps: Yup.array().of(
      Yup.object().shape({
        stepDescription: Yup.string().required("Описание шага обязательно"),
      }),
    ),
  });

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
            <div className={styles.uploadContainer}>
              <input type="file" className={styles.recipeImg} accept="image/*" onChange={onImageUpload} />
              {recipe.ImageUrl && <img src={recipe.ImageUrl} alt="Preview" className={styles.recipeImgPreview} />}
            </div>
            <div className={styles.textFields}>
              <input type="text" placeholder="Название рецепта" value={recipe.name} onChange={onNameChange} required />
              <textarea
                placeholder="Краткое описание рецепта (150 символов)"
                value={recipe.description}
                onChange={onDescriptionChange}
                maxLength={150}
                required
              />
              <input type="text" placeholder="Добавить теги" value={recipe.tags.join(", ")} onChange={onTagChange} />
              <div className={styles.extraInfo}>
                <div className={styles.inputGroup}>
                  <input
                    type="number"
                    placeholder="Время готовки"
                    value={recipe.cookTime}
                    onChange={onCookTimeChange}
                    required
                  />
                  <span>Минут</span>
                </div>
                <div className={styles.inputGroup}>
                  <input type="number" value={recipe.portionCount} onChange={onPortionCountChange} required />
                  <span>Персон</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.recipeContent}>
            <div className={styles.ingredients}>
              <h4>Ингредиенты</h4>
              {recipe.ingredients.map((ingredient, index) => (
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
              {recipe.steps.map((step, index) => (
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
        </form>
      </div>
    </div>
  );
};
