using System.Xml;

namespace Data.Infrastructure.Extensions
{
    public static class XmlExtensions
    {
        public static bool IsValid(string xml)
        {
            try
            {
                new XmlDocument().LoadXml(xml);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
