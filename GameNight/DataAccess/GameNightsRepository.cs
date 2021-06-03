using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameNight.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace GameNight.DataAccess
{
    public class GameNightsRepository
    {
        readonly string ConnectionString;

        public GameNightsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("GameNight");
        }

        public IEnumerable<GameNights> GetAll()
        {
            var sql = @"select * from GameNight gn
	                        join GameGroup gg
		                        on gg.id = gn.groupId";

            using var db = new SqlConnection(ConnectionString);

            var gameNights = db.Query<GameNights, GameGroup, GameNights>(sql,
                (gameNight, gameGroup) =>
                {
                    gameNight.GameGroup = gameGroup;

                    return gameNight;
                }, splitOn: "Id");
            return gameNights;
        }

        public IEnumerable<GameNights> GetById(int id)
        {
            var sql = @"select * from GameNight gn
	                        join GameGroup gg
		                        on gg.id = gn.groupId
                        where gn.id = @id";

            using var db = new SqlConnection(ConnectionString);

            var gameNights = db.Query<GameNights, GameGroup, GameNights>(sql,
                (gameNight, gameGroup) =>
                {
                    gameNight.GameGroup = gameGroup;

                    return gameNight;
                }, new { id });
            return gameNights;
        }

        public IEnumerable<GameNights> GetByGroupId(int id)
        {
            var sql = @"select * from GameNight gn
	                        join GameGroup gg
		                        on gg.id = gn.groupId
                        where gg.id = @id";

            using var db = new SqlConnection(ConnectionString);

            var gameNights = db.Query<GameNights, GameGroup, GameNights>(sql,
                (gameNight, gameGroup) =>
                {
                    gameNight.GameGroup = gameGroup;

                    return gameNight;
                }, new { id }, splitOn: "Id");
            return gameNights;
        }

        public void Add(GameNights gameNight)
        {
            var sql = @"INSERT INTO [GameNight] ([GroupId],[Title],[Date],[Description])
                        OUTPUT inserted.id
                        VALUES(@groupId, @title, @date, @description)";

            using var db = new SqlConnection(ConnectionString);


            var id = db.ExecuteScalar<int>(sql, gameNight);

            gameNight.Id = id;
        }

        public void Update(GameNights gameNight)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [GameNight]
                        SET [GroupId] = @GroupId,
                            [Title] = @Title,
                            [Date] = @Date,
                            [Description] = @Description
                        WHERE id = @id";

            db.Execute(sql, gameNight);
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from GameNight 
                        Where id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
