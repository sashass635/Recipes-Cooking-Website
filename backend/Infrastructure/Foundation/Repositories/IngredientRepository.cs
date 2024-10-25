using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Recipes.Domain.Entities;

namespace Infrastructure.Foundation.Repositories
{
    public class IngredientRepository : Repository<Ingredient>, IIngredientRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        public IngredientRepository( RecipesDbContext context, IUnitOfWork unitOfWork )
            : base( context, unitOfWork )
        {
        }

        public Ingredient? GetByRecipe( int recipeId )
        {
            return _dbContext.Set<Ingredient>().FirstOrDefault( i => i.RecipeId == recipeId );
        }

        public Ingredient? GetIngredientsById( int id )
        {
            return _dbContext.Set<Ingredient>().Find( id );
        }
    }
}