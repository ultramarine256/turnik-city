using Domain.Services.IpDecoder.Models;

namespace Domain.Services.IpDecoder
{
    public interface IIpDecoder
    {
        Task<IpDecodeResponse> DecodeIp(string ip);
    }
}
