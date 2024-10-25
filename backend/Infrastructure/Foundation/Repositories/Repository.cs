using Domain.Repositories;

namespace Infrastructure.Foundation.Repositories
{
    public class Repository<T> : IRepositories<T> where T : class
    {
        protected readonly RecipesDbContext _dbContext;
        protected readonly IUnitOfWork _unitOfWork;


        public Repository( RecipesDbContext dbContext, IUnitOfWork unitOfWork )
        {
            _dbContext = dbContext;
            _unitOfWork = unitOfWork;
        }

        public void Add( T item )
        {
            _dbContext.Set<T>().Add( item );
            _unitOfWork.SaveChanges();
        }

        public void Delete( T item )
        {
            _dbContext.Set<T>().Remove( item );
            _unitOfWork.SaveChanges();
        }
    }
}