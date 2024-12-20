﻿namespace Infrastructure.SecurityServices.PasswordHasher
{
    public interface IPasswordHasher
    {
        string GeneratePassword( string password );
        bool VerifyPassword( string password, string hashedPassword );

    }
}
