using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Example.API.Contexts;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Example.API.Repositories;
using Example.API.Models;
using Example.API.Exceptions.Http;


namespace Example.API.Repositories
{
    public class WidgetRepository : IWidgetRepository
    {
        private readonly ILogger<WidgetRepository> _logger;
        private readonly DbContextOptions<ServiceContext> _options;

        public WidgetRepository(DbContextOptions<ServiceContext> options, ILogger<WidgetRepository> logger)
        {
            _logger = logger;
            _options = options;
        }

        public async Task<WidgetModel> createWidget(string Name, string description, int serviceId)
        {
            var WidgetModel = new WidgetModel
            {
                name = Name,
                description = description,

            };
            using (var context = new ServiceContext(_options))
            {
                ServiceModel serviceModel = await context.service.FirstOrDefaultAsync(s => s.Id == serviceId);
                if (serviceModel == null) {
                    throw new NotFoundHttpException($"Service '{serviceId}' not found");
                }
                serviceModel.widgets.Add(WidgetModel);
                await context.SaveChangesAsync();
            }
            return WidgetModel;
        }

        public async Task<Params> createParams(string name, string type, int widgetId)
        {
            var Params = new Params
            {
                name = name,
                type = type
            };

            _logger.LogInformation($"trying to create a params in the widget with the id : {widgetId}");

            using (var context = new ServiceContext(_options))
            {
                WidgetModel widgetModel = await context.widgets.FirstOrDefaultAsync(w => w.Id == widgetId);
                if (widgetModel == null) {
                    throw new NotFoundHttpException($"Widget '{widgetId}' not found");
                }
                widgetModel.@params.Add(Params);
                await context.SaveChangesAsync();
            }
            return Params;
        }

    }
}