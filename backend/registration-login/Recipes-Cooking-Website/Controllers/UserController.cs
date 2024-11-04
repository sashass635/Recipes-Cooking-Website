using Domain.Entities;
using Domain.Repositories;
using Infrastructure.SecurityServices.JWTTokens;
using Infrastructure.SecurityServices.PasswordHasher;
using Microsoft.AspNetCore.Authorization;
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
        var isPasswordValid = _passwordHasher.VerifyPassword( userDto.Password, existingUser.Password );
        
        if ( existingUser == null || !isPasswordValid )
        {
            return Unauthorized( "Invalid login or password" );
        }

        var token = _jwtTokenProvider.GenerateToken( existingUser );

        Response.Cookies.Append( "CookiesToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddHours( 12 )
        } );

        return Ok( token );
    }

    [Authorize]
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
}