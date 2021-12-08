using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DateAppv4.Entities;
using Microsoft.EntityFrameworkCore;

namespace DateAppv4.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<People> People { get; set; }

    }
}