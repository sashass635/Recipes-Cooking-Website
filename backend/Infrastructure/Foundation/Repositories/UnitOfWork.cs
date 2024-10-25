using Domain.Repositories;
using Infrastructure.Foundation;

namespace Infrastructure.Implementations;

public class UnitOfWork : IUnitOfWork
{
    private readonly RecipesDbContext _recipesDbContext;

    public UnitOfWork( RecipesDbContext recipesDbContext )
    {
        _recipesDbContext = recipesDbContext;
    }

    public void SaveChanges()
    {
        _recipesDbContext.SaveChanges();
    }
}