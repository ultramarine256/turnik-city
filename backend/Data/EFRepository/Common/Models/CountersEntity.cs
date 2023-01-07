using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Entities;

namespace Data.EFRepository.Common.Models
{
    public class CountersEntity
    {
        public int Playgrounds { get; set; }
        public int Cities { get; set; }
        public int Users { get; set; }
        public int Likes { get; set; }
        public IList<UserEntity> NewUsers { get; set; }
        public IList<PlaygroundEntity> NewPlaygorounds { get; set; }
    }
}
