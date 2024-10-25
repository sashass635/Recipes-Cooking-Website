using System.Text.Json.Serialization;
using Recipes.Domain.Entities;

namespace Domain.Entities
{
    public class Recipe
    {
        public int Id { get; init; }
        public int AuthorId { get; init; }
        public User Author { get; init; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CookTime { get; set; }
        public int PortionCount { get; set; }
        public string ImageUrl { get; set; }
        [JsonIgnore]
        public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
        [JsonIgnore]
        public List<RecipeTag> RecipeTags { get; set; } = new List<RecipeTag>();
        [JsonIgnore]
        public List<Step> Steps { get; set; } = new List<Step>();


        public Recipe( int authorId, string name, string description, int cookTime, int portionCount, string imageUrl )
        {
            AuthorId = authorId;
            Name = name;
            Description = description;
            CookTime = cookTime;
            PortionCount = portionCount;
            ImageUrl = imageUrl;
        }
    }
}
