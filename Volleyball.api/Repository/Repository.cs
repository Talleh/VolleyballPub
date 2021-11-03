using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Volleyball.api.Enitities;

namespace Volleyball.api.Repository
{
    public abstract class Repository<TEntity> : IRepository<TEntity>
        where TEntity: class, IEntity
    {
        private readonly ApplicationDbContext _context;
        protected readonly DbSet<TEntity> _set;

        protected Repository(ApplicationDbContext context)
        {
            _context = context;
            _set = _context.Set<TEntity>();
        }

        public int AddOrUpdate(TEntity entity)
        {
            if (entity == null) return -1;
            var id = AddOrUpdateInternal(entity);
            SaveChanges();
            return id;
        }

        public void AddOrUpdateRange(IEnumerable<TEntity> entities)
        {
            if (entities == null || !entities.Any()) return;
            foreach (var entity in entities)
                AddOrUpdateInternal(entity);
            SaveChanges();
        }

        public TEntity Get(int id)
        {
            return _set.Find(id);
        }

        public IEnumerable<TEntity> Get()
        {
            return _set;
        }

        public IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            return _set.Where(filter);
        }

        public void Remove(TEntity entity)
        {
            _set.Remove(entity);
            SaveChanges();
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            _set.RemoveRange(entities);
            SaveChanges();
        }

        public TEntity Find(Expression<Func<TEntity, bool>> filter)
        {
            return _set.Where(filter).FirstOrDefault();
        }

        private int AddOrUpdateInternal(TEntity entity)
        {
            var id = entity.Id;
            if (id == 0)
                id = _set.Add(entity).Entity.Id;
            else _set.Update(entity);
            return id;
        }

        protected void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Remove(int entityId)
        {
            var entity = Get(entityId);
            if (entity == null) return;
            _set.Remove(entity);
            SaveChanges();
        }
    }
}
