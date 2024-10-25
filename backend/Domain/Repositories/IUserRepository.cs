using Domain.Entities;

namespace Domain.Repositories
{
    public interface IUserRepository : IRepositories<User>
    {
        public User? GetUserByLogin( string login );
        public User? GetUserById( int id );
        public IEnumerable<User> GetAllUsers();
    }
}
