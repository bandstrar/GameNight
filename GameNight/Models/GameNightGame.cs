using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameNight.Models
{
    public class GameNightGame
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public BoardGame Game { get; set; }
        public int GameNightId { get; set; }
        public GameNights GameNight { get; set; }
    }
}
