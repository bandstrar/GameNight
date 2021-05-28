using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameNight.Models
{
    public class BoardGame
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        public int MinPlayers { get; set; }
        public int MaxPlayers { get; set; }
        public GameWeight Weight { get; set; }
        public int LengthInMinutes { get; set; }
        public string Genre { get; set; }
        public string GameImage { get; set; }
    }
    public enum GameWeight
    {
        Light,
        MediumLight,
        Medium,
        MediumHeavy,
        Heavy
    }
}
