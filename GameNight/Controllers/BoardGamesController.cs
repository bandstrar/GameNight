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
    [Route("api/games")]
    [ApiController]
    public class BoardGamesController : ControllerBase
    {
        BoardGamesRepository _repo;

        public BoardGamesController(BoardGamesRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllBoardGames()
        {
            var boardGames = _repo.GetAll();

            return Ok(boardGames);
        }

        [HttpGet("{id}")]
        public IActionResult GetGameById(int id)
        {
            var game = _repo.GetById(id);

            if (game == null)
            {
                return NotFound("This game id does not exist");
            }

            return Ok(game);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetGameByUserId(int id)
        {
            var games = _repo.GetByUserId(id);

            if (games == null)
            {
                return NotFound("This user does not have any games");
            }

            return Ok(games);
        }

        [HttpGet("group/{id}")]
        public IActionResult GetGameByGroupId(int id)
        {
            var games = _repo.GetByGroupId(id);

            if (games == null)
            {
                return NotFound("This group does not have any games");
            }

            return Ok(games);
        }

        [HttpPost]
        public IActionResult AddBoardGame(BoardGame boardGame)
        {
            _repo.Add(boardGame);

            return Created($"api/games/{boardGame.Id}", boardGame);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBoardGame(BoardGame boardGame)
        {
            _repo.Update(boardGame);

            return Ok(boardGame);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBoardGame(int id)
        {
            _repo.Remove(id);

            return Ok();
        }
    }
}
