using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameNight.Models
{
    public class GroupUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int GroupId { get; set; }
        public GameGroup GameGroup { get; set; }
        public bool Admin { get; set; }
        public bool IsActive { get; set; }
    }
}
