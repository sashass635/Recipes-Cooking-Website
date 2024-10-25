using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Recipes.Domain.Entities;

namespace Infrastructure.Foundation.Repositories
{
    public class TagRepository : Repository<Tag>, ITagRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        public TagRepository( RecipesDbContext context, IUnitOfWork unitOfWork )
            : base( context, unitOfWork )
        {
        }

        public IEnumerable<Tag> GetByRecipe( int recipeId )
        {
            return _dbContext.Set<RecipeTag>()
                           .Where( rt => rt.RecipeId == recipeId )
                           .Select( rt => rt.Tag )
                           .ToList();
        }

        public IEnumerable<Tag> GetAllTags()
        {
            return _dbContext.Set<Tag>().ToList();
        }

        public Tag? GetByName( string name )
        {
            return _dbContext.Set<Tag>().FirstOrDefault( t => t.Name == name );
        }
    }
}