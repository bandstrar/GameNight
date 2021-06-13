using Dapper;
using GameNight.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameNight.DataAccess
{
    public class NightGameVotesRepository
    {
        readonly string ConnectionString;

        public NightGameVotesRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("GameNight");
        }

        public IEnumerable<NightGameVote> GetByNightGameId(int id)
        {
            var sql = @"select *
                        from NightGameVote
                        where NightGameId = @id";

            using var db = new SqlConnection(ConnectionString);

            var vote = db.Query<NightGameVote>(sql, new { id });

            return vote;
        }

        public void Add(NightGameVote gameVote)
        {
            var sql = @"INSERT INTO [NightGameVote] ([NightGameId],[UserId])
                        OUTPUT inserted.id
                        VALUES(@nightGameId, @userId)";

            using var db = new SqlConnection(ConnectionString);


            var id = db.ExecuteScalar<int>(sql, gameVote);

            gameVote.Id = id;
        }

        public void Remove(int nightGameId, int userId)
        {
            var sql = @"Delete 
                        from NightGameVote 
                        Where NightGameId = @nightGameId
                        AND UserId = @userId";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { nightGameId, userId });
        }

        public void RemoveByGame(int id)
        {
            var sql = @"Delete ngv
                        from NightGameVote ngv
	                        join GameNightGame gng
		                        on gng.id = ngv.NightGameId
	                        join BoardGame bg
		                        on bg.id = gng.GameId
                        WHERE bg.id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

        public void RemoveByGameNight(int id)
        {
            var sql = @"Delete ngv
                        from NightGameVote ngv
	                        join GameNightGame gng
		                        on gng.id = ngv.NightGameId
                        WHERE gng.gameNightId = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
