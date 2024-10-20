namespace Infrastructure.SecurityServices.JWTTokens
{
    public class AuthOptions
    {
        public string SecretKey { get; set; }
        public double ExpiredHours { get; set; }

    }
}