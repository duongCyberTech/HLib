using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using users.Data;
using users.Models;

namespace users.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetById(string id)
        {
            var User = await _context.Users.FindAsync(id);
            if (User == null) return NotFound();
            return User;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Create(User User)
        {
            _context.Users.Add(User);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = User.Uid }, User);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, User User)
        {
            if (id != User.Uid) return BadRequest();

            var exists = await _context.Users.AnyAsync(p => p.Uid == id);
            if (!exists) return NotFound();

            _context.Entry(User).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var User = await _context.Users.FindAsync(id);
            if (User == null) return NotFound();

            _context.Users.Remove(User);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
