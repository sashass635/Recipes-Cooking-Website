using Domain.Entities;
using Domain.Repositories;

namespace Infrastructure.Foundation.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserRepository( RecipesDbContext context, IUnitOfWork unitOfWork )
            : base( context, unitOfWork )
        {
        }

        public User? GetUserByLogin( string login )
        {
            return _dbContext.Set<User>().FirstOrDefault( u => u.Login == login );
        }

        public User? GetUserById( int id )
        {
            return _dbContext.Set<User>().FirstOrDefault( u => u.Id == id );
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _dbContext.Set<User>().ToList();
        }
    }
}
