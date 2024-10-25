import { useRecipeCardWindow } from "./RecipeCard.state";
export const RecipeCardWindow = () => {
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
    onIngredientChange,
    onAddIngredient,
    onRemoveIngredient,
    onAddStep,
    onRemoveStep,
    imagePreview,
    onImageUpload,
    handleStepsChange,
  } = useRecipeCardWindow();

  return (
    <div>
      <div>
        <span>
          <button onClick={close}>Назад</button>
        </span>
        <h3>Добавить новый рецепт</h3>

        <form onSubmit={submit}>
          <div>
            <label htmlFor="image">Загрузите фото готового блюда</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={onImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </div>

          <div>
            <input type="text" placeholder="Название рецепта" value={name} onChange={onNameChange} required />

            <textarea
              placeholder="Краткое описание рецепта (150 символов)"
              value={description}
              onChange={onDescriptionChange}
              maxLength={150}
              required
            />

            <input type="text" placeholder="Добавить теги" value={tags.join(",")} onChange={onTagChange} />

            <div>
              <div>
                <input
                  type="number"
                  placeholder="Время готовки"
                  value={cookTime}
                  onChange={onCookTimeChange}
                  required
                />
                <span>Минут</span>
              </div>

              <div>
                <label>Персон</label>
                <input type="number" value={portionCount} onChange={onPortionCountChange} required />
              </div>
            </div>

            <button type="submit">Опубликовать</button>
          </div>

          <div>
            <h4>Ингредиенты</h4>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Заголовок для ингредиента"
                  value={ingredient.title}
                  onChange={(e) => onIngredientChange(index, e.target.value, "title")}
                  required
                />
                <input
                  type="text"
                  placeholder="Список продуктов для категории"
                  value={ingredient.description}
                  onChange={(e) => onIngredientChange(index, e.target.value, "description")}
                />
                <button type="button" onClick={() => onRemoveIngredient(index)}>
                  Удалить
                </button>
              </div>
            ))}
            <button type="button" onClick={onAddIngredient}>
              Добавить заголовок
            </button>
          </div>

          <div>
            {steps.map((step, index) => (
              <div key={index}>
                <h4>Шаг {index + 1}</h4>
                <textarea
                  placeholder="Описание шага"
                  value={step.stepDescription}
                  onChange={handleStepsChange(index)}
                  required
                />
                <button type="button" onClick={() => onRemoveStep(index)}>
                  Удалить
                </button>
              </div>
            ))}
            <button type="button" onClick={onAddStep}>
              Добавить шаг
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
