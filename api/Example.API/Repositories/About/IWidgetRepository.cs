using Example.API.Models;
using System.Threading.Tasks;
using System;

namespace Example.API.Repositories
{
    public interface IWidgetRepository
    {
        Task<WidgetModel> createWidget(string Name, string description, int serviceId);
        Task<Params> createParams(string name, string type, int widgetId);
    }
}