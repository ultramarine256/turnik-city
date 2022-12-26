using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.EFRepository.Common.Models
{
    public class Member
    {
        public string ImageUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? InstagramId { get; set; }
        public DateTime? CreatedUtc { get; set; }
    }
}
