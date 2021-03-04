using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Example.API.Contexts;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Example.API.Repositories;
using Example.API.Models;
using Example.API.Dtos;


namespace Example.API.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        #region MEMBERS

        private readonly DbContextOptions<ServiceContext> _options;

        #endregion MEMBERS

        public ServiceRepository(DbContextOptions<ServiceContext> options)
        {
            _options = options;
        }

        public async Task<ServiceModel> createService(string Name)
        {
            ServiceModel serviceModel = new ServiceModel
            {
                Name = Name,
            };
            using (var context = new ServiceContext(_options))
            {
                await context.service.AddAsync(serviceModel);
            }
            return serviceModel;
        }
        public async Task<IList<ServiceModel>> getServiceList() 
        {
            List<ServiceModel> list;
            using (var context = new ServiceContext(_options))
            {
                list = await context.service.AsNoTracking().Include(s => s.widgets).ThenInclude(w => w.@params).ToListAsync();
            }
            return list;
        }
    }
}
