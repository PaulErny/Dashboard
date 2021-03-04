using System;
using System.Threading.Tasks;
using Example.API.Models;
using System.Collections.Generic;


namespace Example.API.Repositories
{
    public interface IServiceRepository
    {
        Task<ServiceModel> createService(string Name);
        Task<IList<ServiceModel>> getServiceList();
    }
}
