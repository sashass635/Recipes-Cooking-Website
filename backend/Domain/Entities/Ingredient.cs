using System.Text.Json.Serialization;
using Domain.Entities;

namespace Recipes.Domain.Entities;

public class Ingredient
{
    public int Id { get; init; }
    public int RecipeId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    [JsonIgnore]
    public Recipe Recipe { get; init; }

    public Ingredient( int recipeId, string title, string description )
    {
        RecipeId = recipeId;
        Title = title;
        Description = description;
    }
}