using System.Text.Json.Serialization;
using Domain.Entities;

namespace Recipes.Domain.Entities;

public class Step
{
    public int Id { get; init; }
    public int RecipeId { get; init; }
    public int StepNumber { get; set; }
    public string StepDescription { get; set; }
    [JsonIgnore]
    public Recipe Recipe { get; init; }

    public Step( int recipeId, int stepNumber, string stepDescription )
    {
        RecipeId = recipeId;
        StepNumber = stepNumber;
        StepDescription = stepDescription;
    }
}