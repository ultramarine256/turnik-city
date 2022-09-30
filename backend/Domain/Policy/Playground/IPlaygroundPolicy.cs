using Data.Entities;
using Domain.Policy._Abstract;

namespace Domain.Policy.Playground
{
    public interface IPlaygroundPolicy : IEntityPolicy<PlaygroundEntity, int>
    {
    }
}
