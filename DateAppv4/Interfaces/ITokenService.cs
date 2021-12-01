using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DateAppv4.Entities;

namespace DateAppv4.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}