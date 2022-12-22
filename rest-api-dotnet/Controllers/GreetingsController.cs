using Microsoft.AspNetCore.Mvc;
using rest_api_dotnet.Models;

namespace rest_api_dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GreetingsController : Controller
    {
        private static List<Greetings> _greedings = new List<Greetings>()
        {
            new Greetings(){Id=1, Recipient="Mari", Message="Tere", Sender="Tiia"},
            new Greetings(){Id=2, Recipient="Elsa", Message="Tere", Sender="Tiia"},
            new Greetings(){Id=3, Recipient="Mart", Message="Tere", Sender="Tiia"},
        };

        // GET: api/<WidgetsController>
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_greedings);
        }

        // GET api/<WidgetsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _greedings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Greeding not found" });
            }
            return new JsonResult(result);
        }

        // POST api/<WidgetsController>
        [HttpPost]
        public IActionResult Post([FromBody] Greetings value)
        {
            if (value == null)
            {
                return BadRequest();
            }
            var newId = _greedings.Last().Id + 1;
            value.Id = newId;
            _greedings.Add(value);
            return new CreatedAtActionResult(nameof(Get), nameof(GreetingsController), new { id = newId }, value);
        }

        // PUT api/<WidgetsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Greetings greetings)
        {
            var result = _greedings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Widget not found" });
            }
            result.Recipient = greetings.Recipient;
            result.Message = greetings.Message;
            result.Sender = greetings.Sender;
            return AcceptedAtAction(nameof(Get), new { id = result.Id }, result);
        }

        // DELETE api/<WidgetsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _greedings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Greeding not found" });
            }
            _greedings.Remove(result);
            return NoContent();
        }
    }
}
