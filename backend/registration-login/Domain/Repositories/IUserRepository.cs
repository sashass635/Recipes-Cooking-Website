using Domain.Entities;

namespace Domain.Repositories
{
    public interface IUserRepository : IRepositories<User>
    {
        User? GetUserByLogin( string login );
        User? GetUserById( int id );
        IEnumerable<User> GetAllUsers();
    }
}
