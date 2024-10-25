using System.ComponentModel.DataAnnotations;

namespace Recipes_Cooking_Website.Contracts
{
    public class RecipeRequest
    {
        [Required]
        public string Name { get; set; }

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
        public List<TagRequest> Tags { get; init; }
    }
}
