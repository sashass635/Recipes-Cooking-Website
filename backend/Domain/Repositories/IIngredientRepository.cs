using Recipes.Domain.Entities;

namespace Domain.Repositories
{
    public interface IIngredientRepository : IRepositories<Ingredient>
    {
        public Ingredient? GetByRecipe( int recipeId );
        public Ingredient? GetIngredientsById( int id );
    }
}
