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
    public class GameGroupsRepository
    {
        readonly string ConnectionString;

        public GameGroupsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("GameNight");
        }

        public List<GameGroup> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from GameGroup";

            return db.Query<GameGroup>(sql).ToList();
        }

        public IEnumerable<GameGroup> Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from GameGroup
                        where id = @id";

            var group = db.Query<GameGroup>(sql, new { id });

            return group;
        }

        public IEnumerable<GameGroup> GetByUserId(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var userId = id;

            var sql = @"select *
                        from GameGroup gg
                            join groupUser gu
                                on gu.groupId = gg.id
                            join siteUser su
                                on su.id = gu.userId
                        where su.id = @id
                        and gu.isActive = 1";

            var groups = db.Query<GameGroup, GroupUser, User, GameGroup>(sql,
                (gameGroup, groupUser, user) =>
                {
                    groupUser.User = user;
                    groupUser.GameGroup = gameGroup;

                    return gameGroup;
                }, new { id }, splitOn: "Id");

            return groups;
        }

        public void Add(GameGroup group)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [GameGroup] ([Name],[Image],[Description])
                            OUTPUT inserted.id
                            VALUES(@Name,@Image,@Description)";

            var id = db.ExecuteScalar<int>(sql, group);

            group.Id = id;
        }

        public void Update(GameGroup group)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE GameGroup
                        SET Name = @Name,
                            Image = @Image,
                            Description = @Description
                        WHERE id = @id";

            db.Execute(sql, group);
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from GameGroup 
                        Where id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
