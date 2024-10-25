using Domain.Entities;

namespace Domain.Repositories
{
    public interface IRecipeRepository : IRepositories<Recipe>
    {
        public Recipe GetById( int id );
        public IEnumerable<Recipe> GetAllRecipes();
        public Recipe DeleteById( int id );
        public Recipe Update( int id, Recipe recipe );
    }
}