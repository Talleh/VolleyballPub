using System.ComponentModel.DataAnnotations.Schema;

namespace Volleyball.api.Enitities
{
    public class HallTax : IEntity
    {
        public int Id { get; set; }
        public virtual Hall Hall { get; set; }
        public bool IsMemberTaxDinamic { get; set; }

        [Column(TypeName = "money")]
        public decimal MemberPlayerTax { get; set; }
        [Column(TypeName = "money")]
        public decimal RegularPlayerTax { get; set; }
        public bool IsRegularTaxDinamic { get; set; }
        [Column(TypeName = "money")]
        public decimal? MonthRentTax { get; set; }
        [Column(TypeName = "money")]
        public decimal GameRentTax { get; set; }
    }
}
