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

        [HttpGet("gameNight/{id}")]
        public IActionResult GetNightGameByNightId(int id)
        {
            var gameNightGame = _repo.GetByGameNightId(id);

            if (gameNightGame == null)
            {
                return NotFound("This game night id does not exist");
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

        [HttpDelete("{id}")]
        public IActionResult DeleteNightGame(int id)
        {
            _repo.Remove(id);

            return Ok();
        }

        [HttpDelete("game/{id}")]
        public IActionResult DeleteByGameId(int id)
        {
            _repo.RemoveByGameId(id);

            return Ok();
        }

        [HttpDelete("gameNight/{id}")]
        public IActionResult DeleteByGameNightId(int id)
        {
            _repo.RemoveByGameNightId(id);

            return Ok();
        }
    }
}
