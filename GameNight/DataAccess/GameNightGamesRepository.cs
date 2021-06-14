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
    public class GameNightGamesRepository
    {
        readonly string ConnectionString;

        public GameNightGamesRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("GameNight");
        }

        public IEnumerable<GameNightGame> GetAll()
        {
            var sql = @"select * from GameNightGame gng
                            join BoardGame bg
                                on bg.id = gng.gameId
	                        join GameNight gn
		                        on gn.id = gng.gameNightId
                            join SiteUser su
                                on su.id = bg.userId
                            join GameGroup gg
                                on gg.id = gn.groupId";

            using var db = new SqlConnection(ConnectionString);

            var gameNightGames = db.Query<GameNightGame, BoardGame, GameNights, User, GameGroup, GameNightGame>(sql,
                (gameNightGame, boardGame, gameNight, user, gameGroup) =>
                {
                    gameNightGame.Game = boardGame;
                    gameNightGame.GameNight = gameNight;

                    boardGame.User = user;
                    gameNight.GameGroup = gameGroup;

                    return gameNightGame;
                }, splitOn: "Id");
            return gameNightGames;
        }

        public IEnumerable<GameNightGame> GetById(int id)
        {
            var sql = @"select * from GameNightGame gng
                            join BoardGame bg
                                on bg.id = gng.gameId
	                        join GameNight gn
		                        on gn.id = gng.gameNightId
                            join SiteUser su
                                on su.id = bg.userId
                            join GameGroup gg
                                on gg.id = gn.groupId
                        where gng.id = @id";

            using var db = new SqlConnection(ConnectionString);

            var gameNightGames = db.Query<GameNightGame, BoardGame, GameNights, User, GameGroup, GameNightGame>(sql,
                (gameNightGame, boardGame, gameNight, user, gameGroup) =>
                {
                    gameNightGame.Game = boardGame;
                    gameNightGame.GameNight = gameNight;

                    boardGame.User = user;
                    gameNight.GameGroup = gameGroup;

                    return gameNightGame;
                }, new { id });
            return gameNightGames;
        }

        public IEnumerable<GameNightGame> GetByGameNightId(int id)
        {
            var sql = @"select * from GameNightGame gng
                            join BoardGame bg
                                on bg.id = gng.gameId
	                        join GameNight gn
		                        on gn.id = gng.gameNightId
                            join SiteUser su
                                on su.id = bg.userId
                            join GameGroup gg
                                on gg.id = gn.groupId
                        where gn.id = @id
                        order by bg.title asc";

            using var db = new SqlConnection(ConnectionString);

            var gameNightGames = db.Query<GameNightGame, BoardGame, GameNights, User, GameGroup, GameNightGame>(sql,
                (gameNightGame, boardGame, gameNight, user, gameGroup) =>
                {
                    gameNightGame.Game = boardGame;
                    gameNightGame.GameNight = gameNight;

                    boardGame.User = user;
                    gameNight.GameGroup = gameGroup;

                    return gameNightGame;
                }, new { id });
            return gameNightGames;
        }

        public void Add(GameNightGame gameNightGame)
        {
            var sql = @"INSERT INTO [GameNightGame] ([GameId],[GameNightId])
                        OUTPUT inserted.id
                        VALUES(@gameId, @gameNightId)";

            using var db = new SqlConnection(ConnectionString);


            var id = db.ExecuteScalar<int>(sql, gameNightGame);

            gameNightGame.Id = id;
        }

        public void Update(GameNightGame gameNightGame)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [GameNightGame]
                        SET [GameId] = @GameId,
                            [GameNightId] = @GameNightId,
                        WHERE id = @id";

            db.Execute(sql, gameNightGame);
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from GameNightGame 
                        Where id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

        public void RemoveByGameId(int id)
        {
            var sql = @"Delete 
                        from GameNightGame 
                        Where gameId = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

        public void RemoveByGameNightId(int id)
        {
            var sql = @"Delete 
                        from GameNightGame 
                        Where gameNightId = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }

        public void RemoveByGroupId(int id)
        {
            var sql = @"Delete gng
                        from GameNightGame gng
                            join GameNight gn
                                on gn.id = gng.gameNightId
                        Where gn.groupId = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
