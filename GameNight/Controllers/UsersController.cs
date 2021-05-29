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
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepository _repo;

        public UsersController(UsersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var user = _repo.Get(id);

            if (user == null)
            {
                return NotFound("This user id does not exist");
            }

            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser(User siteUser)
        {
            _repo.Add(siteUser);

            return Created($"api/SiteUsers/{siteUser.Id}", siteUser);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(User siteUser)
        {
            _repo.Update(siteUser);

            return Ok(siteUser);
        }
    }
}
