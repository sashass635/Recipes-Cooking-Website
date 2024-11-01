using System.Text.Json.Serialization;

namespace Domain.Entities;
public class User
{
    public int Id { get; private init; }
    public string Name { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public string? Description { get; set; }
    public List<Recipe> Recipes { get; set; } = new List<Recipe>();

    public User( string name, string login, string password )
    {
        Name = name;
        Login = login;
        Password = password;

    }
}