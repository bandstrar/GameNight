using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameNight.Models
{
    public class NightGameVote
    {
        public int Id { get; set; }
        public int NightGameId { get; set; }
        public int UserId { get; set; }
    }
}
