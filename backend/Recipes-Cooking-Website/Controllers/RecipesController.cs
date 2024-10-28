using System.IdentityModel.Tokens.Jwt;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Recipes.Domain.Entities;
using Recipes.WebApi.Dto.RecipeDtos;
using Recipes_Cooking_Website.Contracts;

namespace Recipes_Cooking_Website.Controllers;

[ApiController]
[Route( "api/recipes" )]
public class RecipesController : ControllerBase
{
    private readonly IRecipeRepository _recipeRepository;
    private readonly ITagRepository _tagRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserRepository _userRepository;

    public RecipesController( IRecipeRepository recipeRepository, ITagRepository tagRepository, IUnitOfWork unitOfWork, IUserRepository userRepository )
    {
        _recipeRepository = recipeRepository;
        _tagRepository = tagRepository;
        _unitOfWork = unitOfWork;
        _userRepository = userRepository;
    }

    [HttpPost( "add" )]
    public IActionResult CreateRecipe( [FromBody] RecipeRequest recipeRequest )
    {
        if ( !Request.Headers.ContainsKey( "Authorization" ) )
        {
            return Unauthorized( "Authorization header is missing" );
        }

        var token = Request.Headers[ "Authorization" ].ToString();
        Console.WriteLine( $"Token received: {token}" );

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken( token );
        var userIdClaim = jwtToken.Claims.FirstOrDefault( claim => claim.Type == "UserId" )?.Value;

        if ( string.IsNullOrEmpty( userIdClaim ) )
        {
            return Unauthorized( "UserId claim is missing in the token" );
        }

        var authorId = int.Parse( userIdClaim );

        var newRecipe = new Recipe( authorId, recipeRequest.Name, recipeRequest.Description, recipeRequest.CookTime, recipeRequest.PortionCount, recipeRequest.ImageUrl );

        foreach ( var ingredientDto in recipeRequest.Ingredients )
        {
            var ingredient = new Ingredient( newRecipe.Id, ingredientDto.Title, ingredientDto.Description );
            newRecipe.Ingredients.Add( ingredient );
        }

        for ( int i = 0; i < recipeRequest.Steps.Count; i++ )
        {
            var step = new Step( newRecipe.Id, i + 1, recipeRequest.Steps[ i ].StepDescription );
            newRecipe.Steps.Add( step );
        }

        foreach ( var tagDto in recipeRequest.Tags )
        {
            var tag = _tagRepository.GetByName( tagDto.Name );
            if ( tag == null )
            {
                tag = new Tag( tagDto.Name );
                _tagRepository.Add( tag );
                _unitOfWork.SaveChanges();
            }

            var recipeTag = new RecipeTag( newRecipe.Id, tag.Id );
            newRecipe.RecipeTags.Add( recipeTag );
        }

        var user = _userRepository.GetUserById( authorId );
        if ( user != null )
        {
            user.Recipes.Add( newRecipe );
        }

        _recipeRepository.Add( newRecipe );
        return Ok( "Recipe created successfully" );
    }

    [HttpPut( "update/{id}" )]
    public IActionResult UpdateRecipe( int id, [FromBody] RecipeUpdateRequest recipeUpdateRequest )
    {
        var existingRecipe = _recipeRepository.GetById( id );
        if ( existingRecipe == null )
        {
            return NotFound( "Recipe not found" );
        }

        if ( existingRecipe.Name != recipeUpdateRequest.Name )
            existingRecipe.Name = recipeUpdateRequest.Name;

        if ( existingRecipe.Description != recipeUpdateRequest.Description )
            existingRecipe.Description = recipeUpdateRequest.Description;

        if ( existingRecipe.CookTime != recipeUpdateRequest.CookTime )
            existingRecipe.CookTime = recipeUpdateRequest.CookTime;

        if ( existingRecipe.PortionCount != recipeUpdateRequest.PortionCount )
            existingRecipe.PortionCount = recipeUpdateRequest.PortionCount;

        if ( existingRecipe.ImageUrl != recipeUpdateRequest.ImageUrl )
            existingRecipe.ImageUrl = recipeUpdateRequest.ImageUrl;

        existingRecipe.Ingredients.Clear();
        foreach ( var ingredientDto in recipeUpdateRequest.Ingredients )
        {
            var ingredient = new Ingredient( existingRecipe.Id, ingredientDto.Title, ingredientDto.Description );
            existingRecipe.Ingredients.Add( ingredient );
        }

        existingRecipe.Steps.Clear();
        for ( int i = 0; i < recipeUpdateRequest.Steps.Count; i++ )
        {
            var step = new Step( existingRecipe.Id, i + 1, recipeUpdateRequest.Steps[ i ].StepDescription );
            existingRecipe.Steps.Add( step );
        }

        existingRecipe.RecipeTags.Clear();
        foreach ( var tagDto in recipeUpdateRequest.Tags )
        {
            var tag = _tagRepository.GetByName( tagDto.Name );
            if ( tag == null )
            {
                tag = new Tag( tagDto.Name );
                _tagRepository.Add( tag );
                _unitOfWork.SaveChanges();
            }

            var recipeTag = new RecipeTag( existingRecipe.Id, tag.Id );
            existingRecipe.RecipeTags.Add( recipeTag );
        }

        _recipeRepository.Update( existingRecipe.Id, existingRecipe );
        _unitOfWork.SaveChanges();
        return Ok( "Recipe updated successfully" );
    }

    [HttpDelete( "delete/{id}" )]

    public IActionResult DeleteRecipe( int id )
    {
        var recipe = _recipeRepository.GetById( id );
        if ( recipe == null )
        {
            return NotFound( "Recipe not found" );
        }

        _recipeRepository.Delete( recipe );
        return Ok( "Recipe deleted successfully" );
    }

    [HttpGet( "all" )]
    public IActionResult GetAllRecipes()
    {
        var recipes = _recipeRepository.GetAllRecipes();
        return Ok( recipes );
    }

    [HttpGet( "all/{id}" )]
    public IActionResult GetRecipeById( int id )
    {
        var recipe = _recipeRepository.GetById( id );
        if ( recipe == null )
        {
            return NotFound( "Recipe not found" );
        }
        return Ok( recipe );
    }

    [HttpGet( "usersRecipes" )]
    public IActionResult GetRecipesByUserId()
    {
        if ( !Request.Headers.ContainsKey( "Authorization" ) )
        {
            return Unauthorized( "Authorization header is missing" );
        }

        var token = Request.Headers[ "Authorization" ].ToString();
        Console.WriteLine( $"Token received: {token}" );

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken( token );
        var userIdClaim = jwtToken.Claims.FirstOrDefault( claim => claim.Type == "UserId" )?.Value;

        if ( string.IsNullOrEmpty( userIdClaim ) )
        {
            return Unauthorized( "UserId claim is missing in the token" );
        }

        var authorId = int.Parse( userIdClaim );
        var recipes = _recipeRepository.GetRecipesByUserId( authorId );
        if ( recipes == null || !recipes.Any() )
        {
            return NotFound( "No recipes found for this user" );
        }

        return Ok( recipes );
    }
}