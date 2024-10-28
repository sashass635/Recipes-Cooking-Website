using System.ComponentModel.DataAnnotations;

namespace Recipes_Cooking_Website.Contracts
{
    public class UserRequest
    {
        [Required]
        public int Id { get; private init; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Login { get; set; }

        [Required]
        public int RecipeCount { get; set; }

        [Required]
        public int LikeCount { get; set; }

        [Required]
        public int FavouriteCount { get; set; }
    }
}
