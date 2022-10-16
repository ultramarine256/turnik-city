using Data.ThirdParty.IPStack.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Data.ThirdParty.IPStack
{
    public interface IIpDecoder
    {
        Task<DecodeIpModel> DecodeIp(string ip);
    }

    public class IpDecoder : IIpDecoder
    {
        public string ApiKey { get; }

        public IpDecoder(string apiKey)
        {
            ApiKey = apiKey;
        }

        public async Task<DecodeIpModel> DecodeIp(string ip = null)
        {
            var json = await new HttpClient().GetStringAsync($"http://api.ipstack.com/{ip}?access_key={ApiKey}&format=1");
            var model = JsonConvert.DeserializeObject<DecodeIpModel>(json, new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver { NamingStrategy = new SnakeCaseNamingStrategy() },
                Formatting = Formatting.Indented
            });
            return model;
        }
            
    }

    public class IpDecoderStub : IIpDecoder
    {
        public Task<DecodeIpModel> DecodeIp(string ip)
            => Task.FromResult(new DecodeIpModel());
    }
}
