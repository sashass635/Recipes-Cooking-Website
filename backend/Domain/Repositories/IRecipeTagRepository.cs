using Domain.Entities;

namespace Domain.Repositories
{
    public interface IRecipeTagRepository : IRepositories<RecipeTag>
    {
        public RecipeTag? GetByRecipe( int recipeId );

    }
}
