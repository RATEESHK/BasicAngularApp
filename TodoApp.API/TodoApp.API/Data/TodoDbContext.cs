using Microsoft.EntityFrameworkCore;
using TodoApp.API.Models;

namespace TodoApp.API.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }

        public virtual DbSet<Todo> Todos { get; set; }
    }
}
