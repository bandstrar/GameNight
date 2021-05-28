using Dapper;
using GameNight.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameNight.DataAccess
{
    public class GameGroupsRepository
    {
        const string ConnectionString = "Server=localhost;Database=GameNight;Trusted_Connection=True;";

        public List<GameGroup> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from GameGroup";

            return db.Query<GameGroup>(sql).ToList();
        }

        public IEnumerable<GameGroup> Get(string id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from GameGroup
                        where id = @id";

            var group = db.Query<GameGroup>(sql, new { id });

            return group;
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
