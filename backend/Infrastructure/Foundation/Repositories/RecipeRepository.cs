using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Foundation.Repositories
{
    public class RecipeRepository : Repository<Recipe>, IRecipeRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public RecipeRepository( RecipesDbContext context, IUnitOfWork unitOfWork )
            : base( context, unitOfWork )
        {
        }

        public Recipe GetById( int id )
        {
            return _dbContext.Set<Recipe>()
                .Include( r => r.Ingredients )
                .Include( r => r.Steps )
                .Include( r => r.RecipeTags )
                .FirstOrDefault( r => r.Id == id );
        }

        public IEnumerable<Recipe> GetAllRecipes()
        {
            return _dbContext.Set<Recipe>()
                .Include( r => r.Ingredients )
                .Include( r => r.Steps )
                .Include( r => r.RecipeTags )
                .ThenInclude( rt => rt.Tag )
                .ToList();
        }

        public Recipe DeleteById( int id )
        {
            var recipe = GetById( id );
            if ( recipe == null )
            {
                return null;
            }

            _dbContext.Set<Recipe>().Remove( recipe );
            _unitOfWork.SaveChanges();

            return recipe;
        }


        public Recipe Update( int id, Recipe updatedRecipe )
        {
            var recipe = GetById( id );
            if ( recipe != null )
            {
                recipe.Name = updatedRecipe.Name;
                recipe.Description = updatedRecipe.Description;
                recipe.CookTime = updatedRecipe.CookTime;
                recipe.PortionCount = updatedRecipe.PortionCount;
                recipe.ImageUrl = updatedRecipe.ImageUrl;
                recipe.Ingredients = updatedRecipe.Ingredients;
                recipe.Steps = updatedRecipe.Steps;
                recipe.RecipeTags = updatedRecipe.RecipeTags;
            }
            return recipe;
        }
    }
}