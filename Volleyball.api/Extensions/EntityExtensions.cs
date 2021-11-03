using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Volleyball.api.Enitities;

namespace Volleyball.api.Extensions
{
    public static class EntityExtensions
    {
        public static IEnumerable<T> IdDistinct<T>(this IEnumerable<T> list) where T : IEntity
        {
            return list.Distinct(new IdComparere<T>());
        }

        private class IdComparere<T> : IEqualityComparer<T>
            where T : IEntity
        {
            public bool Equals([AllowNull] T x, [AllowNull] T y)
            {
                return x.Id == y.Id;
            }

            public int GetHashCode([DisallowNull] T obj)
            {
                return obj.GetHashCode();
            }
        }
    }
}
