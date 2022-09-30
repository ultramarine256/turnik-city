using System;
using System.Threading.Tasks;
using Data.EFContext;
using Data.ThirdParty.Storage;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Xunit.Abstractions;

namespace Tests.Domain
{
    public class DebugTests
    {
        public ITestOutputHelper TestOutputHelper { get; }
        private AppDbContext Context { get; }
        private StorageService Storage { get; }

        public DebugTests(ITestOutputHelper testOutputHelper)
        {
            TestOutputHelper = testOutputHelper;
            var connectionSrt = "Host=general-p1.postgres.database.azure.com;Database=turnik-prod;Username=toto;Password=V76t1eKi4cuy";
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseNpgsql(connectionSrt)
                .Options;
            Context = new AppDbContext(options);
            Storage = new StorageService(
                "turnikcity",
                "qGB4z7S6WyCR4PYeml7b2B1X7MdHIR3XflkP4kXlrCYp0HOqA7kS9tb9hJGJbMUz3IEn/qh/N0Cq+AStIcyZdw==",
                "images");
        }

        [Fact]
        public async Task DataTypeTest()
        {
            var x1 = "47.00435704045979";
            var x2 = Convert.ToDouble(x1);
            Console.WriteLine(x2);
        }
    }
}