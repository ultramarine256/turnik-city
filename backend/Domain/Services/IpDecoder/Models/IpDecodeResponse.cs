using Newtonsoft.Json;

namespace Domain.Services.IpDecoder.Models
{

    public class IpDecodeResponse
    {
        [JsonProperty("ip")]
        public string ip { get; set; }
        [JsonProperty("country_code")]
        public string country_code { get; set; }
        [JsonProperty("country_name")]
        public string country_name { get; set; }
        [JsonProperty("region_code")]
        public string region_code { get; set; }
        [JsonProperty("region_name")]
        public string region_name { get; set; }
        [JsonProperty("city")]
        public string city { get; set; }
        [JsonProperty("location")]
        public IpDecodeLocation location { get; set; }

        public IpDecodeResponse()
        {
            location = new IpDecodeLocation();
            // TODO: use map from json
        }
    }

    public class IpDecodeLocation
    {
        [JsonProperty("capital")]
        public string capital { get; set; }
        [JsonProperty("country_flag")]
        public string country_flag { get; set; }
    }
}
