using System.ComponentModel.DataAnnotations;

namespace Recipes_Cooking_Website.Contracts
{
    public class TagRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
