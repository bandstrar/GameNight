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
    [Route("api/nightGame")]
    [ApiController]
    public class GameNightGamesController : ControllerBase
    {
        GameNightGamesRepository _repo;

        public GameNightGamesController(GameNightGamesRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllGameNightGames()
        {
            var gameNightGames = _repo.GetAll();

            return Ok(gameNightGames);
        }

        [HttpGet("{id}")]
        public IActionResult GetNightGameById(int id)
        {
            var gameNightGame = _repo.GetById(id);

            if (gameNightGame == null)
            {
                return NotFound("This game night game id does not exist");
            }

            return Ok(gameNightGame);
        }

        [HttpPost]
        public IActionResult AddGameNightGame(GameNightGame gameNightGame)
        {
            _repo.Add(gameNightGame);

            return Created($"api/nightGame/{gameNightGame.Id}", gameNightGame);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateNightGame(GameNightGame gameNightGame)
        {
            _repo.Update(gameNightGame);

            return Ok(gameNightGame);
        }

        [HttpPut("{id}/addVote")]
        public IActionResult AddVoteForGame(int id)
        {
            _repo.AddVote(id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNightGame(int id)
        {
            _repo.Remove(id);

            return Ok();
        }
    }
}
