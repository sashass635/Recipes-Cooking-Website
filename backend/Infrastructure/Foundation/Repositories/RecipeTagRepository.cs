using Domain.Entities;
using Domain.Repositories;
using Recipes.Domain.Entities;

namespace Infrastructure.Foundation.Repositories
{
    public class RecipeTagRepository : Repository<RecipeTag>, IRecipeTagRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        public RecipeTagRepository( RecipesDbContext context, IUnitOfWork unitOfWork )
            : base( context, unitOfWork )
        {
        }

        public RecipeTag? GetByRecipe( int recipeId )
        {
            return _dbContext.Set<RecipeTag>().FirstOrDefault( rt => rt.RecipeId == recipeId );
        }
    }
}