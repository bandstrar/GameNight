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
    public class UsersRepository
    {
        readonly string ConnectionString;

        public UsersRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("GameNight");
        }

        public List<User> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from SiteUser";

            return db.Query<User>(sql).ToList();
        }

        public IEnumerable<User> Get(string id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from SiteUser
                        where firebaseid = @id";

            var user = db.Query<User>(sql, new { id });

            return user;
        }

        public void Add(User siteUser)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [SiteUser] ([FirstName],[LastName],[Email], [UserImage], [FirebaseId])
                            OUTPUT inserted.id
                            VALUES(@FirstName,@LastName,@Email,@UserImage,@FirebaseId)";

            var id = db.ExecuteScalar<int>(sql, siteUser);

            siteUser.Id = id;
        }

        public void Update(User siteUser)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE SiteUser
                        SET FirstName = @FirstName,
                            LastName = @LastName,
                            Email = @Email,
                            UserImage = @UserImage
                        WHERE id = @id";

            db.Execute(sql, siteUser);
        }
    }
}
