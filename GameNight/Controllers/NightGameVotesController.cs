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
    [Route("api/gameVotes")]
    [ApiController]
    public class NightGameVotesController : ControllerBase
    {
        NightGameVotesRepository _repo;

        public NightGameVotesController(NightGameVotesRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("nightGame/{id}")]
        public IActionResult GetVoteByNightGameId(int id)
        {
            var gameVote = _repo.GetByNightGameId(id);

            if (gameVote == null)
            {
                return NotFound("This game night game does not have any votes yet.");
            }

            return Ok(gameVote);
        }

        [HttpPost]
        public IActionResult AddVote(NightGameVote gameVote)
        {
            _repo.Add(gameVote);

            return Created($"api/gameNight/{gameVote.Id}", gameVote);
        }

        [HttpDelete("{nightGameId}/{userId}")]
        public IActionResult RemoveVote(int nightGameId, int userId)
        {
            _repo.Remove(nightGameId, userId);

            return Ok();
        }

        [HttpDelete("game/{id}")]
        public IActionResult RemoveAllGameVotes(int id)
        {
            _repo.RemoveByGame(id);

            return Ok();
        }

        [HttpDelete("gameNight/{id}")]
        public IActionResult RemoveAllGameNightVotes(int id)
        {
            _repo.RemoveByGameNight(id);

            return Ok();
        }
    }
}
