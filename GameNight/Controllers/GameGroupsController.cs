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

        public GameGroupsController()
        {
            _repo = new GameGroupsRepository();
        }

        [HttpGet]
        public IActionResult GetAllGroups()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var group = _repo.Get(id);

            if (group == null)
            {
                return NotFound("This group id does not exist");
            }

            return Ok(group);
        }

        [HttpPost]
        public IActionResult AddUser(GameGroup group)
        {
            _repo.Add(group);

            return Created($"api/groups/{group.Id}", group);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(GameGroup group)
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
