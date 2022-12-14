namespace Domain.Services.Email.Models
{
    public class ContactUsEmailData
    {
        public string JsonString { get; set; }
        
        public string PageUrl { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public string CountryCity { get; set; }
        public string DeviceIp { get; set; }
    }
}
