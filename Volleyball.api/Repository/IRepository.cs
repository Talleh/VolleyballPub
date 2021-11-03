using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository
{
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        int AddOrUpdate(TEntity entity);
        void AddOrUpdateRange(IEnumerable<TEntity> entities);
        TEntity Get(int id);
        TEntity Find(Expression<Func<TEntity, bool>> filter);
        IEnumerable<TEntity> Get();
        IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter);
        void Remove(TEntity entity);
        void Remove(int entityId);
        void RemoveRange(IEnumerable<TEntity> entities);
    }
}
