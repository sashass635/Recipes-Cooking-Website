using System.ComponentModel.DataAnnotations;

namespace Recipes_Cooking_Website.Contracts
{
    public class CreateLoginUserRequest
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
