using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _todoDbContext;

        public TodoController(TodoDbContext todoDbContext)
        {
            _todoDbContext = todoDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            var todos = await _todoDbContext.Todos.Where(x => x.IsDeleted == false).OrderByDescending(x => x.CreatedDate).ToListAsync();

            return Ok(todos);
        }

        [HttpGet]
        [Route("archivedTodos")]
        public async Task<IActionResult> GetAllArchivedTodos()
        {
            var todos = await _todoDbContext.Todos.Where(x => x.IsDeleted == true).OrderByDescending(x => x.CreatedDate).ToListAsync();

            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(Todo todo)
        {
            todo.Id = Guid.NewGuid();

            _todoDbContext.Todos.Add(todo);

            await _todoDbContext.SaveChangesAsync();

            return Ok(todo); 
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] Guid id, Todo todoUpdateObj)
        {
            var todo = await _todoDbContext.Todos.FindAsync(id);

            if (todo == null)
                return NotFound();

            todo.IsCompleted = todoUpdateObj.IsCompleted;
            todo.CompletedDate = DateTime.Now;

            await _todoDbContext.SaveChangesAsync();

            return Ok(todo);
        }

        [HttpPut]
        [Route("undoArchivedTodos/{id:Guid}")]
        public async Task<IActionResult> UndoArchivedTodos([FromRoute] Guid id, Todo todoUpdateObj)
        {
            var todo = await _todoDbContext.Todos.FindAsync(id);

            if (todo == null)
                return NotFound();

            todo.IsDeleted = false;
            todo.DeletedDate = null;

            await _todoDbContext.SaveChangesAsync();

            return Ok(todo);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] Guid id)
        {
            var todo = await _todoDbContext.Todos.FindAsync(id);

            if (todo == null)
                return NotFound();

            todo.IsDeleted = true;
            todo.DeletedDate = DateTime.Now;

            await _todoDbContext.SaveChangesAsync();

            return Ok(todo);
        }
    }
}
