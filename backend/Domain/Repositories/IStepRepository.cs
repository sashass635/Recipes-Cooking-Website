using Recipes.Domain.Entities;

namespace Domain.Repositories
{
    public interface IStepRepository : IRepositories<Step>
    {
        public Step? GetByRecipe( int recipeId );
        public Step? GetStepById( int id );
    }
}
