using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameNight.Models
{
    public class GameNight
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public GameGroup GameGroup { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
