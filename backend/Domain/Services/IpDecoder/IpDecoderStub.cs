using Domain.Services.IpDecoder.Models;

namespace Domain.Services.IpDecoder
{
    public class IpDecoderStub : IIpDecoder
    {
        public Task<IpDecodeResponse> DecodeIp(string ip) => 
            Task.FromResult(new IpDecodeResponse());
    }
}
