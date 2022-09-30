using Data.Entities;
using WebApi.Controllers._Abstract.Dtos;

namespace WebApi.Controllers.App.Playground.Dtos
{
    public class PlaygroundDto : EntityDto<PlaygroundEntity, int, PlaygroundDto>
    {
        public string Slug { get; set; }
        public string Title { get; set; }

        public string Size { get; set; }
        public string Type { get; set; }

        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }

        public IList<string> ImageUrls { get; set; }
        public IList<string> Equipment { get; set; }

        public override PlaygroundEntity MapToEntity(PlaygroundEntity entity)
        {
            entity = base.MapToEntity(entity);
            entity.Slug = Slug;
            entity.Title = Title;

            entity.Size = Size;
            entity.Type = Type;

            entity.Address = Address;
            entity.City = City;
            entity.Lat = Lat;
            entity.Lng = Lng;

            entity.SetImages(ImageUrls);
            entity.SetEquipment(Equipment);

            return entity;
        }

        public override PlaygroundDto MapFromEntity(PlaygroundEntity entity)
        {
            base.MapFromEntity(entity);
            Slug = entity.Slug;

            Title = entity.Title;
            
            Size = entity.Size;
            Type = entity.Type;

            Address = entity.Address;
            City = entity.City;
            Lat = entity.Lat;
            Lng = entity.Lng;

            ImageUrls = entity.GetImages();
            Equipment = entity.GetEquipment();

            return this;
        }
    }
}
