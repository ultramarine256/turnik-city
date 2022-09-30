using Domain.Services.IpDecoder.Models;
using Newtonsoft.Json;

namespace Domain.Services.IpDecoder
{
    public class IpDecoder : IIpDecoder
    {
        public string ApiKey { get; }

        public IpDecoder(string apiKey)
        {
            ApiKey = apiKey;
        }

        public async Task<IpDecodeResponse> DecodeIp(string ip) =>
            JsonConvert.DeserializeObject<IpDecodeResponse>(await new HttpClient().GetStringAsync($"http://api.ipstack.com/{ip}?access_key={ApiKey}&format=1"));
    }
}
