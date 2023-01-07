using Data.EFRepository;
using Data.EFRepository.Playground;
using Data.EFRepository.Playground.Models;
using Data.EFRepository.User;
using Data.Entities;
using Data.Infrastructure.UnitOfWork;
using Domain.DomainServices._Abstractions;
using Domain.Policy._Abstract;

namespace Domain.DomainServices.Playground
{
    public interface IPlaygroundDomainService : IEntityDomainService<PlaygroundEntity, int>
    {
        Task<IEnumerable<PlaygroundMarker>> GetMarkers();
    }

    public class PlaygroundDomainService : EntityDomainService<PlaygroundEntity, int>, IPlaygroundDomainService
    {
        public IPlaygroundRepository PlaygroundRepository { get; }

        public PlaygroundDomainService(
            IEntityPolicy<PlaygroundEntity, int> policy,
            IPlaygroundRepository playgroundRepository,
            IAppUnitOfWorkManager uowManager) : base(policy, playgroundRepository, uowManager)
        {
            PlaygroundRepository = playgroundRepository;
        }

        public async Task<IEnumerable<PlaygroundMarker>> GetMarkers()
            => PlaygroundRepository.GetMarkers();
    }
}
