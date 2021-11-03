using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Volleyball.api.Enitities
{
    public class PlayerAccount : IEntity
    {
        public int Id { get; set; }
        public virtual Player Player { get; set; }
        public virtual Hall Hall { get; set; }
        [Column(TypeName = "money")]
        public decimal? Amount { get; set; }
    }
}
