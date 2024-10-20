using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.SecurityServices.JWTTokens
{
    public class JwtProvider
    {
        private readonly AuthOptions _options;
        public JwtProvider( IOptions<AuthOptions> options )
        {
            _options = options.Value;
        }
        public string GenerateToken( User user )
        {
            Claim[] claims = [ new( "UserId", user.Id.ToString() ) ];

            var signingCredentials = new SigningCredentials( new SymmetricSecurityKey( Encoding.UTF8.GetBytes( _options.SecretKey ) ), SecurityAlgorithms.HmacSha256 );

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.UtcNow.AddHours( _options.ExpiredHours ) );

            var tokenValue = new JwtSecurityTokenHandler().WriteToken( token );

            return tokenValue;
        }
    }
}