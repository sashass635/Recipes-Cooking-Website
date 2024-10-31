import { useAddingRecipeCardWindow } from "./AddingRecipeWindow.state";
import styles from "./AddingRecipeWindow.module.scss";
import * as Yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";

export const AddingRecipeCardWindow = () => {
  const {
    recipe,
    onTagChange,
    close,
    onNameChange,
    onDescriptionChange,
    onCookTimeChange,
    onPortionCountChange,
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

        <Formik initialValues={recipe} validationSchema={recipeSchema} onSubmit={(values) => handleAddRecipe(values)}>
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <button className={styles.buttonHeader} type="submit">
                Опубликовать
              </button>
              <div className={styles.recipeContent}>
                <Field
                  type="file"
                  className={styles.recipeImg}
                  accept="image/*"
                  name="image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    onImageUpload(e);
                  }}
                />
                {recipe.ImageUrl && <img src={recipe.ImageUrl} alt="Preview" className={styles.recipeImgPreview} />}
                <div className={styles.textFields}>
                  <Field
                    type="text"
                    placeholder="Название рецепта"
                    name="name"
                    value={values.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      onNameChange(e);
                    }}
                    required
                  />
                  <Field
                    as="textarea"
                    placeholder="Краткое описание рецепта (150 символов)"
                    name="description"
                    value={values.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleChange(e);
                      onDescriptionChange(e);
                    }}
                    maxLength={200}
                    required
                  />
                  <Field
                    type="text"
                    placeholder="Добавить теги"
                    name="tags"
                    value={Array.isArray(values.tags) ? values.tags.join(", ") : ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const inputValue = e.target.value;
                      const tagsArray = inputValue.split(",").map((tag) => tag.trim());
                      setFieldValue("tags", tagsArray);
                      onTagChange(e);
                    }}
                  />
                  <div className={styles.extraInfo}>
                    <div className={styles.inputGroup}>
                      <Field
                        type="number"
                        name="cookTime"
                        value={values.cookTime}
                        placeholder="Время готовки"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          onCookTimeChange(e);
                        }}
                        required
                      />
                      <span>Минут</span>
                    </div>
                    <div className={styles.inputGroup}>
                      <Field
                        type="number"
                        name="portionCount"
                        placeholder="Персон"
                        value={values.portionCount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          onPortionCountChange(e);
                        }}
                        required
                      />
                      <span>Персон</span>
                    </div>
                  </div>
                </div>
              </div>
              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <div className={styles.ingredients}>
                    <h4>Ингредиенты</h4>
                    {values.ingredients.map((ingredient, index) => (
                      <div className={styles.ingredient} key={index}>
                        <Field
                          type="text"
                          name={`ingredients.${index}.title`}
                          placeholder="Заголовок для ингредиента"
                          value={ingredient.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                            ingredientTitle(index, e);
                          }}
                          required
                        />
                        <Field
                          as="textarea"
                          name={`ingredients.${index}.description`}
                          placeholder="Список продуктов для категории"
                          value={ingredient.description}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                            ingredientDescription(index, e);
                          }}
                        />
                        <button type="button" onClick={() => remove(index)}>
                          &times;
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ title: "", description: "" })}>
                      Добавить заголовок
                    </button>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="steps">
                {({ push, remove }) => (
                  <div className={styles.steps}>
                    {values.steps.map((step, index) => (
                      <div className={styles.step} key={index}>
                        <h4>Шаг {index + 1}</h4>
                        <Field
                          as="textarea"
                          name={`steps.${index}.stepDescription`}
                          placeholder="Описание шага"
                          value={step.stepDescription}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            handleChange(e);
                            StepsChange(index)(e);
                          }}
                          required
                        />

                        <button type="button" onClick={() => remove(index)}>
                          &times;
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ stepDescription: "" })}>
                      Добавить шаг
                    </button>
                  </div>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
