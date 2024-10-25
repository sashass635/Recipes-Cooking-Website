using System.ComponentModel.DataAnnotations;

namespace Recipes_Cooking_Website.Contracts
{
    public class StepRequest
    {
        [Required]
        public int StepNumber { get; set; }

        [Required]
        public string StepDescription { get; set; }
    }
}
