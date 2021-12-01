using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DateAppv4.Data;
using DateAppv4.DTO;
using DateAppv4.Entities;
using DateAppv4.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DateAppv4.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDto registerDto) 
        {

            if (await UserExists(registerDto.Username)) 
            {
                return BadRequest("Username is taken");
            }
            using var hmac = new HMACSHA512();
            
            var user = new AppUser {
                UserName = registerDto.Username,
                 PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                 PassowrdSalt = hmac.Key
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return new UserDTO {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

        }

        [HttpPost("login")] 
        
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)  
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == login.Username);

            if (user == null) {
                return Unauthorized("Invalid username");
            }

            using var hmac = new HMACSHA512(user.PassowrdSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++) 
            {
                if (computedHash[i] != user.PasswordHash[i])

                return Unauthorized("Invalid password");
            }

            return new UserDTO {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username) 
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

    }
}