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
    public class BoardGamesRepository
    {
        readonly string ConnectionString;

        public BoardGamesRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("GameNight");
        }

        public IEnumerable<BoardGame> GetAll()
        {
            var sql = @"select * from BoardGame bg
	                        join SiteUser su
		                        on su.id = bg.UserId";

            using var db = new SqlConnection(ConnectionString);

            var boardGames = db.Query<BoardGame, User, BoardGame>(sql,
                (boardGame, user) =>
                {
                    boardGame.User = user;

                    return boardGame;
                }, splitOn: "Id");
            return boardGames;
        }

        public IEnumerable<BoardGame> GetByUserId(int id)
        {
            var sql = @"select * from BoardGame bg
	                        join SiteUser su
		                        on su.id = bg.UserId
                        where bg.userId = @id";

            using var db = new SqlConnection(ConnectionString);

            var boardGames = db.Query<BoardGame, User, BoardGame>(sql,
                (boardGame, user) =>
                {
                    boardGame.User = user;

                    return boardGame;
                }, new { id }, splitOn: "Id");
            return boardGames;
        }

        public IEnumerable<BoardGame> GetByGroupId(int id)
        {
            var sql = @"select *
                        from BoardGame bg
                            join SiteUser su
                                on su.id = bg.UserId
	                        join GroupUser gu
		                        on gu.UserId = bg.UserId
                        where gu.GroupId = @id
						and gu.IsActive = 1";

            using var db = new SqlConnection(ConnectionString);

            var boardGames = db.Query<BoardGame, User, GroupUser, BoardGame>(sql,
                (boardGame, user, groupUser) =>
                {
                    boardGame.User = user;
                    groupUser.User = user;

                    return boardGame;
                }, new { id }, splitOn: "Id");
            return boardGames;
        }

        public IEnumerable<BoardGame> GetById(int id)
        {
            var sql = @"select * from BoardGame bg
	                        join SiteUser su
		                        on su.id = bg.UserId
                        where bg.id = @id";

            using var db = new SqlConnection(ConnectionString);

            var boardGame = db.Query<BoardGame, User, BoardGame>(sql,
                (boardGame, user) =>
                {
                    boardGame.User = user;

                    return boardGame;
                }, new { id });
            return boardGame;
        }

        public void Add(BoardGame boardGame)
        {
            var sql = @"INSERT INTO [BoardGame] ([UserId],[Title],[MinPlayers],[MaxPlayers],[Weight],[LengthInMinutes],[Genre],[GameImage])
                        OUTPUT inserted.id
                        VALUES(@userId, @title, @minPlayers, @maxPlayers, @weight, @lengthInMinutes, @genre, @gameImage)";

            using var db = new SqlConnection(ConnectionString);


            var id = db.ExecuteScalar<int>(sql, boardGame);

            boardGame.Id = id;
        }

        public void Update(BoardGame boardGame)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [BoardGame]
                        SET [UserId] = @UserId,
                            [Title] = @Title,
                            [MinPlayers] = @MinPlayers,
                            [MaxPlayers] = @MaxPlayers,
                            [Weight] = @Weight,
                            [LengthInMinutes] = @LengthInMinutes,
                            [Genre] = @Genre,
                            [GameImage] = @GameImage
                        WHERE id = @id";

            db.Execute(sql, boardGame);
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from BoardGame 
                        Where id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
