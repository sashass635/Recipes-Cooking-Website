using System.IdentityModel.Tokens.Jwt;
using Domain.Entities;
using Domain.Repositories;
using Infrastructure.SecurityServices.JWTTokens;
using Infrastructure.SecurityServices.PasswordHasher;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Recipes_Cooking_Website.Contracts;

namespace Recipes_Cooking_Website.Controllers;

[ApiController]
[Route( "api/user" )]
public class UserController : ControllerBase
{

    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly JwtProvider _jwtTokenProvider;

    public UserController( IUserRepository userRepository, IPasswordHasher passwordHasher, JwtProvider jwtTokenProvider )
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenProvider = jwtTokenProvider;
    }

    [HttpPost( "register" )]
    public IActionResult Register( [FromBody] CreateRegisterUserRequest userDto )
    {
        var existingUser = _userRepository.GetUserByLogin( userDto.Login );
        if ( existingUser != null )
        {
            return NotFound( "User with this login already exists" );
        }

        var passwordHash = _passwordHasher.GeneratePassword( userDto.Password );
        var newUser = new User( userDto.Name, userDto.Login, passwordHash );

        _userRepository.Add( newUser );

        return Ok( "Registration successful" );
    }

    [HttpPost( "login" )]
    public IActionResult Login( [FromBody] CreateLoginUserRequest userDto )
    {
        var existingUser = _userRepository.GetUserByLogin( userDto.Login );
        if ( existingUser == null || !_passwordHasher.VerifyPassword( userDto.Password, existingUser.Password ) )
        {
            return Unauthorized( "Invalid login or password" );
        }

        var token = _jwtTokenProvider.GenerateToken( existingUser );

        Response.Cookies.Append( "CookiesToken", token, new CookieOptions
        {
            Expires = DateTime.UtcNow.AddHours( 12 ),
        } );

        return Ok( token );
    }

    [HttpGet( "all" )]
    public IActionResult GetAllUsers()
    {
        var users = _userRepository.GetAllUsers();

        foreach ( var user in users )
        {
            Console.WriteLine( $"Id: {user.Id}, Name: {user.Name}, Login: {user.Login}, Password: {user.Password}" );
        }

        return Ok( users );
    }

    [HttpPost( "update" )]
    public IActionResult UpdateProfile( UpdatedUserRequest userRequest )
    {

        if ( !Request.Cookies.TryGetValue( "CookiesToken", out var token ) )
        {
            Console.WriteLine( "Token is missing in cookies" );
            return Unauthorized( "Authentication token is missing" );
        }

        Console.WriteLine( $"Token back: {token}" );

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken( token );
        var userIdClaim = jwtToken.Claims.FirstOrDefault( claim => claim.Type == "UserId" )?.Value;

        if ( string.IsNullOrEmpty( userIdClaim ) )
        {
            return Unauthorized( "UserId claim is missing in the token" );
        }

        var userId = int.Parse( userIdClaim );
        var user = _userRepository.GetUserById( userId );

        if ( user == null )
        {
            return NotFound();
        }

        if ( !_passwordHasher.VerifyPassword( userRequest.OldPassword, user.Password ) )
        {
            return BadRequest( "Wrong old password" );
        }

        var hashedPassword = _passwordHasher.GeneratePassword( userRequest.NewPassword );

        user.Name = userRequest.Name;
        user.Description = userRequest.Description;
        user.Login = userRequest.Login;
        user.Password = hashedPassword;

        _userRepository.Update( user );
        return Ok( user );
    }

    [HttpGet( "current" )]
    public IActionResult GetCurrentUser()
    {

        if ( !Request.Cookies.TryGetValue( "CookiesToken", out var token ) )
        {
            Console.WriteLine( "Token is missing in cookies" );
            return Unauthorized( "Authentication token is missing" );
        }

        Console.WriteLine( $"Token back: {token}" );

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken( token );
        var userIdClaim = jwtToken.Claims.FirstOrDefault( claim => claim.Type == "UserId" )?.Value;

        if ( string.IsNullOrEmpty( userIdClaim ) )
        {
            return Unauthorized( "UserId claim is missing in the token" );
        }

        var userId = int.Parse( userIdClaim );
        var user = _userRepository.GetUserById( userId );

        if ( user == null )
        {
            return NotFound();
        }

        return Ok( user );
    }
}
