using System.ComponentModel.DataAnnotations;

namespace Recipes_Cooking_Website.Contracts
{
    public class IngredientRequest
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
