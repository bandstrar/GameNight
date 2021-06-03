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
    public class GroupUsersRepository
    {
        readonly string ConnectionString;

        public GroupUsersRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("GameNight");
        }

        public IEnumerable<GroupUser> GetAll()
        {
            var sql = @"select * from GroupUser gu
	                        join SiteUser su
		                        on su.id = gu.UserId
	                        join GameGroup gg
		                        on gg.Id = gu.GroupId";

            using var db = new SqlConnection(ConnectionString);

            var groupUsers = db.Query<GroupUser, User, GameGroup, GroupUser>(sql,
                (groupUser, user, gameGroup) =>
                {
                    groupUser.User = user;
                    groupUser.GameGroup = gameGroup;

                    return groupUser;
                }, splitOn: "Id");
            return groupUsers;
        }

        public IEnumerable<GroupUser> GetById(int id)
        {
            var sql = @"select * from GroupUser gu
	                        join SiteUser su
		                        on su.id = gu.UserId
	                        join GameGroup gg
		                        on gg.Id = gu.GroupId
                        where gu.id = @id";

            using var db = new SqlConnection(ConnectionString);

            var foundGroupUser = db.Query<GroupUser, User, GameGroup, GroupUser>(sql,
                (groupUser, user, gameGroup) =>
                {
                    groupUser.User = user;
                    groupUser.GameGroup = gameGroup;

                    return groupUser;
                }, new { id });
            return foundGroupUser;
        }

        public IEnumerable<GroupUser> GetActiveByGroupId(int id)
        {
            var sql = @"select * from GroupUser gu
	                        join SiteUser su
		                        on su.id = gu.UserId
	                        join GameGroup gg
		                        on gg.Id = gu.GroupId
                        where gg.id = @id
                        and gu.isActive = 1";

            using var db = new SqlConnection(ConnectionString);

            var foundGroupUser = db.Query<GroupUser, User, GameGroup, GroupUser>(sql,
                (groupUser, user, gameGroup) =>
                {
                    groupUser.User = user;
                    groupUser.GameGroup = gameGroup;

                    return groupUser;
                }, new { id }, splitOn: "Id");
            return foundGroupUser;
        }

        public IEnumerable<GroupUser> GetInactiveByGroupId(int id)
        {
            var sql = @"select * from GroupUser gu
	                        join SiteUser su
		                        on su.id = gu.UserId
	                        join GameGroup gg
		                        on gg.Id = gu.GroupId
                        where gg.id = @id
                        and gu.isActive = 0";

            using var db = new SqlConnection(ConnectionString);

            var foundGroupUser = db.Query<GroupUser, User, GameGroup, GroupUser>(sql,
                (groupUser, user, gameGroup) =>
                {
                    groupUser.User = user;
                    groupUser.GameGroup = gameGroup;

                    return groupUser;
                }, new { id }, splitOn: "Id");
            return foundGroupUser;
        }

        public void Add(GroupUser groupUser)
        {
            var sql = @"INSERT INTO [GroupUser] ([UserId],[GroupId],[Admin],[IsActive])
                        OUTPUT inserted.id
                        VALUES(@userId, @groupId, @admin, @isActive)";

            using var db = new SqlConnection(ConnectionString);


            var id = db.ExecuteScalar<int>(sql, groupUser);

            groupUser.Id = id;
        }

        public void Update(GroupUser groupUser)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [GroupUser]
                        SET [UserId] = @UserId,
                            [GroupId] = @GroupId,
                            [Admin] = @Admin,
                            [IsActive] = @IsActive
                        WHERE id = @id";

            db.Execute(sql, groupUser);
        }

        public void MakeInactive(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"update GroupUser
                        set IsActive = 0
                        where id = @id";

            db.Execute(sql, new { id });
        }

        public void ApproveUser(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"update GroupUser
                        set IsActive = 1
                        where id = @id";

            db.Execute(sql, new { id });
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from GroupUser 
                        Where id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
