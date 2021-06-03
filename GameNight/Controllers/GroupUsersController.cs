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
    [Route("api/groupUsers")]
    [ApiController]
    public class GroupUsersController : ControllerBase
    {
        GroupUsersRepository _repo;

        public GroupUsersController(GroupUsersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllGroupUsers()
        {
            var groupUsers = _repo.GetAll();

            return Ok(groupUsers);
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleGroupUser(int id)
        {
            var user = _repo.GetById(id);

            if (user == null)
            {
                return NotFound("This group user id does not exist");
            }

            return Ok(user);
        }

        [HttpGet("{id}/{groupId}")]
        public IActionResult GetCurrentGroupUser(int id, int groupId)
        {
            var user = _repo.GetCurrentUser(id, groupId);

            if (user == null)
            {
                return NotFound("This user does not belong to this group.");
            }

            return Ok(user);
        }

        [HttpGet("group/{id}/active")]
        public IActionResult GetActiveGroupUsers(int id)
        {
            var user = _repo.GetActiveByGroupId(id);

            if (user == null)
            {
                return NotFound("This group does not have any active users");
            }

            return Ok(user);
        }

        [HttpGet("group/{id}/inactive")]
        public IActionResult GetInactiveGroupUsers(int id)
        {
            var user = _repo.GetInactiveByGroupId(id);

            if (user == null)
            {
                return NotFound("This group does not have any inactive users");
            }

            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddGroupUser(GroupUser groupUser)
        {
            _repo.Add(groupUser);

            return Created($"api/GroupUsers/{groupUser.Id}", groupUser);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGroupUser(GroupUser groupUser)
        {
            _repo.Update(groupUser);

            return Ok(groupUser);
        }

        [HttpPut("{id}/makeInactive")]
        public IActionResult DeactivateGroupUser(int id)
        {
            _repo.MakeInactive(id);

            return NoContent();
        }

        [HttpPut("{id}/approve")]
        public IActionResult ApproveGroupUser(int id)
        {
            _repo.ApproveUser(id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGroupUser(int id)
        {
            _repo.Remove(id);

            return Ok();
        }
    }
}
