using System.Text.Json.Serialization;
using Domain.Entities;

namespace Recipes.Domain.Entities;

public class Tag
{
    public int Id { get; private init; }
    public string Name { get; set; }
    [JsonIgnore]
    public List<RecipeTag> RecipeTags { get; set; } = new List<RecipeTag>();

    public Tag( string name )
    {
        Name = name;
    }
}

