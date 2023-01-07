using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DomainServices.User.Models
{
    public class UserProfileDto
    {
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public string FullName { get; set; }
        public string Bio { get; set; }
        public string InstagramId { get; set; }
        public string TelegramId { get; set; }
        public string City { get; set; }
    }
}
