using Recipes.Domain.Entities;

namespace Domain.Repositories
{
    public interface ITagRepository : IRepositories<Tag>
    {
        public IEnumerable<Tag> GetByRecipe( int recipeId );
        public IEnumerable<Tag> GetAllTags();
        public Tag? GetByName( string name );

    }
}