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

        <Formik initialValues={recipe} validationSchema={recipeSchema} onSubmit={(values) => handleAddRecipe(values)}>
          {({ values, setFieldValue }) => (
            <Form>
              <button className={styles.buttonHeader} type="submit">
                Опубликовать
              </button>

              <div className={styles.recipeContent}>
                <input
                  type="file"
                  className={styles.recipeImg}
                  accept="image/*"
                  name="ImageUrl"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onImageUpload(e);
                    setFieldValue("ImageUrl", e.target.value);
                  }}
                />
                {values.ImageUrl && <img src={values.ImageUrl} alt="Preview" className={styles.recipeImgPreview} />}

                <div className={styles.textFields}>
                  <Field
                    type="text"
                    placeholder="Название рецепта"
                    name="name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("name", e.target.value);
                      onNameChange(e);
                    }}
                    required
                  />
                  <Field
                    as="textarea"
                    placeholder="Описание"
                    name="description"
                    maxLength={200}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setFieldValue("description", e.target.value);
                      onDescriptionChange(e);
                    }}
                    required
                  />
                  <Field
                    type="text"
                    placeholder="Теги"
                    name="tags"
                    value={values.tags.join(", ")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("tags", e.target.value.split(","));
                      onTagChange(e);
                    }}
                  />
                  <div className={styles.extraInfo}>
                    <Field
                      type="number"
                      name="cookTime"
                      placeholder="Время готовки"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("cookTime", Number(e.target.value));
                        onCookTimeChange(e);
                      }}
                      required
                    />
                    <Field
                      type="number"
                      name="portionCount"
                      placeholder="Персон"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("portionCount", Number(e.target.value));
                        onPortionCountChange(e);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <FieldArray name="ingredients">
                {() => (
                  <div className={styles.ingredients}>
                    <h4>Ингредиенты</h4>
                    {values.ingredients.map((ingredient, index) => (
                      <div className={styles.ingredient} key={index}>
                        <Field
                          type="text"
                          name={`ingredients.${index}.title`}
                          placeholder="Заголовок для ингредиента"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue(`ingredients.${index}.title`, e.target.value);
                            ingredientTitle(index, e);
                          }}
                          required
                        />
                        <Field
                          as="textarea"
                          name={`ingredients.${index}.description`}
                          placeholder="Описание ингредиента"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue(`ingredients.${index}.description`, e.target.value);
                            ingredientDescription(index, e);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            onRemoveIngredient(index);
                            setFieldValue(
                              "ingredients",
                              values.ingredients.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        onAddIngredient();
                        setFieldValue("ingredients", [...values.ingredients, { title: "", description: "" }]);
                      }}
                    >
                      Добавить ингредиент
                    </button>
                  </div>
                )}
              </FieldArray>

              <FieldArray name="steps">
                {() => (
                  <div className={styles.steps}>
                    {recipe.steps.map((step, index) => (
                      <div className={styles.step} key={index}>
                        <h4>Шаг {index + 1}</h4>
                        <Field
                          as="textarea"
                          name={`steps.${index}.stepDescription`}
                          placeholder="Описание шага"
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setFieldValue(`steps.${index}.stepDescription`, e.target.value);
                            StepsChange(index)(e);
                          }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            onRemoveStep(index);
                            setFieldValue(
                              "steps",
                              values.steps.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        onAddStep();
                        setFieldValue("steps", [...values.steps, { stepDescription: "" }]);
                      }}
                    >
                      {" "}
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
