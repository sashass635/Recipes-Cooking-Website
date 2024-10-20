namespace Domain.Repositories
{
    public interface IRepositories<T> where T : class
    {
        public void Add( T item );
    }
}