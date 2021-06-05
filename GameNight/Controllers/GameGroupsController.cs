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
    [Route("api/groups")]
    [ApiController]
    public class GameGroupsController : ControllerBase
    {
        GameGroupsRepository _repo;

        public GameGroupsController(GameGroupsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllGroups()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var group = _repo.Get(id);

            if (group == null)
            {
                return NotFound("This group id does not exist");
            }

            return Ok(group);
        }

        [HttpGet("search/{term}")]
        public IActionResult GetSearchedGroups(string term)
        {
            var groups = _repo.GetSearched(term);

            return Ok(groups);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetUserGroups(int id)
        {
            var groups = _repo.GetByUserId(id);

            if (groups == null)
            {
                return NotFound("This user does not belong to any groups");
            }

            return Ok(groups);
        }

        [HttpPost]
        public IActionResult AddGroup(GameGroup group)
        {
            _repo.Add(group);

            return Created($"api/groups/{group.Id}", group);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGroup(GameGroup group)
        {
            _repo.Update(group);

            return Ok(group);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGroup(int id)
        {
            _repo.Remove(id);

            return Ok();
        }
    }
}
