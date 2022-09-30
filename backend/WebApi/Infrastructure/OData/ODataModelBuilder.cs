using Data.Entities;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace WebApi.Infrastructure.OData
{
    public class AppODataModelBuilder
    {
        public IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();

            builder.EntitySet<PlaygroundEntity>("Playground")
                .EntityType
                .Filter()
                .Count()
                .Expand()
                .OrderBy()
                .Page()
                .Select();

            builder.EnableLowerCamelCase();

            return builder.GetEdmModel();
        }
    }
}
