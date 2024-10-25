using System.Text.Json.Serialization;
using Recipes.Domain.Entities;

namespace Domain.Entities
{
    public class RecipeTag
    {
        public int RecipeId { get; set; }
        [JsonIgnore]
        public Recipe Recipe { get; set; }
        public int TagId { get; set; }
        [JsonIgnore]
        public Tag Tag { get; set; }

        public RecipeTag( int recipeId, int tagId )
        {
            RecipeId = recipeId;
            TagId = tagId;
        }

    }
}
