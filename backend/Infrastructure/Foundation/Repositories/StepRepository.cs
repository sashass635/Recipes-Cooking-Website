using Domain.Entities;
using Domain.Repositories;
using Recipes.Domain.Entities;

namespace Infrastructure.Foundation.Repositories
{
    public class StepRepository : Repository<Step>, IStepRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        public StepRepository( RecipesDbContext context, IUnitOfWork unitOfWork )
            : base( context, unitOfWork )
        {
        }

        public Step? GetByRecipe( int recipeId )
        {
            return _dbContext.Set<Step>().FirstOrDefault( s => s.RecipeId == recipeId );
        }

        public Step? GetStepById( int id )
        {
            return _dbContext.Set<Step>().FirstOrDefault( s => s.Id == id );

        }
    }
}