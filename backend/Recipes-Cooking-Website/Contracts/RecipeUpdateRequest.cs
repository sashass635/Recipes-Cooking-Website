using System.ComponentModel.DataAnnotations;
using Recipes_Cooking_Website.Contracts;

namespace Recipes.WebApi.Dto.RecipeDtos;

public class RecipeUpdateRequest
{
    [Required]
    public string Name { get; init; }

    [Required]
    public string Description { get; set; }

    [Required]
    public int CookTime { get; set; }

    [Required]
    public int PortionCount { get; set; }

    [Required]
    public string ImageUrl { get; set; }

    [Required]
    public List<IngredientRequest> Ingredients { get; set; }

    [Required]
    public List<StepRequest> Steps { get; set; }

    [Required]
    public List<TagRequest> Tags { get; set; }
}