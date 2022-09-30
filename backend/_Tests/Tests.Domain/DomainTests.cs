using System.Threading.Tasks;
using Xunit;

namespace Tests.Domain
{
    public class DomainTests
    {
        [Fact]
        public async Task DoodleTest_ShouldAlwaysTrue()
        {
            Assert.Equal(true, true);
        }
    }
}
