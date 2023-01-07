namespace Data.ThirdParty.IPStack.Models
{
    public class DecodeIpDto
    {
        public string Ip { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public string RegionCode { get; set; }
        public string RegionName { get; set; }
        public string City { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public IpDecodeLocation Location { get; set; }

        public DecodeIpDto()
        {
            Location = new IpDecodeLocation();
        }
    }

    public class IpDecodeLocation
    {
        public string CountryFlag { get; set; }
    }
}
