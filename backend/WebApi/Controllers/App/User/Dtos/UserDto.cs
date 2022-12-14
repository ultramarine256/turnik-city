using Data.Entities;
using WebApi.Controllers._Abstract.Dtos;

namespace WebApi.Controllers.App.User.Dtos
{
    public class UserDto : EntityDto<UserEntity, int, UserDto>
    {
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public override UserEntity MapToEntity(UserEntity entity)
        {
            entity = base.MapToEntity(entity);
            entity.Email = Email;
            entity.ImageUrl = ImageUrl;

            entity.FirstName = FirstName;
            entity.LastName = LastName;
            entity.PhoneNumber = PhoneNumber;

            return entity;
        }

        public override UserDto MapFromEntity(UserEntity entity)
        {
            base.MapFromEntity(entity);
            Email = entity.Email;

            ImageUrl = entity.ImageUrl;
            
            FirstName = entity.FirstName;
            LastName = entity.LastName;
            PhoneNumber = entity.PhoneNumber;

            return this;
        }
    }
}
