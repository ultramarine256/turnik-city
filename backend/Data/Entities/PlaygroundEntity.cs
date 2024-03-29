﻿using Data.Entities.Abstract;
using Newtonsoft.Json;

namespace Data.Entities
{
    public class PlaygroundEntity : Entity<int>, IUpdatableFrom<PlaygroundEntity>
    {
        public string Slug { get; set; }
        public string? Title { get; set; }

        public string? Size { get; set; }
        public string? Type { get; set; }

        public string? Address { get; set; }
        public string? City { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }

        public string? PhotosJson { get; set; }
        public string? EquipmentJson { get; set; }

        public DateTime? CreatedUtc { get; set; }
        public string? CreatedBy { get; set; }

        public int ViewsCount { get; set; }
        public int LikesCount { get; set; }

        public string? GetTitle()
            => $"{Id} {Size} {Type}";

        public string? GetFirstImageUrl()
        {
            var images = GetImages();
            return images.Count > 0 ? images.FirstOrDefault()! : null;
        }

        public IList<string> GetImages()
            => (String.IsNullOrEmpty(PhotosJson)
                ? new List<string>()
                : JsonConvert.DeserializeObject<List<string>>(PhotosJson))!;

        public void SetImages(IList<string> items)
            => PhotosJson = JsonConvert.SerializeObject(items);

        public IList<string> GetEquipment()
            => String.IsNullOrEmpty(EquipmentJson)
                ? new List<string>()
                : JsonConvert.DeserializeObject<List<string>>(EquipmentJson)!;

        public void SetEquipment(IList<string> items)
            => EquipmentJson = JsonConvert.SerializeObject(items);

        public void UpdateFrom(PlaygroundEntity actualEntity) => throw new NotImplementedException();
    }

    public class PlaygroundType
    {
        public const string
            Modern = "modern",
            Soviet = "soviet",
            Legendary = "legendary";
    }

    public class PlaygroundSize
    {
        public const string
            Small = "small",
            Medium = "medium",
            Large = "large";
    }

    public class LocationType
    {
        public const string
            Playground = "playground";
    }
}
