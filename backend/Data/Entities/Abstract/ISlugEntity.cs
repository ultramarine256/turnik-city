using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities.Abstract
{
    /// <summary>
    /// Is used as Base Slug entity
    /// </summary>
    /// <typeparam name="TPrimaryKey">type of primary key</typeparam>
    public interface ISlugEntity<TPrimaryKey>
    {
        TPrimaryKey Id { get; set; }
        string Slug { get; set; }
        IList<string> GetEntityIncludes();
    }
}
