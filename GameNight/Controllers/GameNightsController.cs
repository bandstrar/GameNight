using GameNight.DataAccess;
using GameNight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameNight.Controllers
{
    [Route("api/gameNight")]
    [ApiController]
    public class GameNightsController : ControllerBase
    {
        GameNightsRepository _repo;

        public GameNightsController(GameNightsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllGameNights()
        {
            var gameNights = _repo.GetAll();

            return Ok(gameNights);
        }

        [HttpGet("{id}")]
        public IActionResult GetNightById(int id)
        {
            var gameNight = _repo.GetById(id);

            if (gameNight == null)
            {
                return NotFound("This game night id does not exist");
            }

            return Ok(gameNight);
        }

        [HttpGet("group/{id}")]
        public IActionResult GetNightByGroupId(int id)
        {
            var gameNight = _repo.GetByGroupId(id);

            if (gameNight == null)
            {
                return NotFound("This group does not have any game nights");
            }

            return Ok(gameNight);
        }

        [HttpPost]
        public IActionResult AddGameNight(GameNights gameNight)
        {
            _repo.Add(gameNight);

            return Created($"api/gameNight/{gameNight.Id}", gameNight);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGameNight(GameNights gameNight)
        {
            _repo.Update(gameNight);

            return Ok(gameNight);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGameNight(int id)
        {
            _repo.Remove(id);

            return Ok();
        }
    }
}
