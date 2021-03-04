using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Example.API.Dtos;
using System;
using Example.API.Repositories;
using Example.API.Models;
using Microsoft.AspNetCore.Cors;


namespace Example.API.Controllers.About
{
    [ApiController]
    [Route("about.json")]
    [EnableCors("ClientPermission")]
    public sealed class AboutController : ControllerBase
    {
        #region MEMBERS
        private readonly ILogger<AboutController> _logger;
        private readonly IHttpContextAccessor _accessor;
        private readonly IServiceRepository _serviceRepo;

        private readonly IWidgetRepository _widgetRepo;

        #endregion MEMBERS

        #region CONSTRUCTORS

        public AboutController(IServiceRepository repo, ILogger<AboutController> logger, IHttpContextAccessor accessor, IWidgetRepository widgetRepo)
        {
            _widgetRepo = widgetRepo;
            _serviceRepo = repo;
            _logger = logger;
            _accessor = accessor;
        }

        #endregion CONTRUCTORS

        #region ROUTES

        [HttpGet]
        public async Task<IActionResult> getService()
        {
            var unixTimestamp = (int)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            var ip = _accessor.HttpContext.Connection.RemoteIpAddress.ToString();
            _logger.LogInformation($"About list is requested ");
            var service = await _serviceRepo.getServiceList();
            AboutModel aboutModel = new AboutModel
            {
                host = ip,
                services = service,
                currentTime = unixTimestamp.ToString()
            };
            return Ok(aboutModel);
        }


        [HttpPost("service")]
        public async Task<IActionResult> createServiceAsync([FromBody] ServiceCreateDto serviceCreateDto)
        {
            var service = await _serviceRepo.createService(serviceCreateDto.name);
            return Created($"http://{Request.Host.Value}/about.json/service", service.Id);
        }

        [HttpPost("widget")]
        public async Task<IActionResult> createWidgetAsync([FromBody] WidgetCreateDto widgetCreateDto)
        {
            var widget = await _widgetRepo.createWidget(widgetCreateDto.name, widgetCreateDto.description, widgetCreateDto.ServiceId);
            return Created($"http://{Request.Host.Value}/about.json/widget", widget.Id);
        }

        [HttpPost("Params")]
        public async Task<IActionResult> createParamsAsync([FromBody] ParmsCreateDto parmsCreateDto)
        {
            _logger.LogInformation($"posting with widget id : {parmsCreateDto.WigdetId}");
            var Params = await _widgetRepo.createParams(parmsCreateDto.name, parmsCreateDto.type, parmsCreateDto.WigdetId);
            return Created($"http://{Request.Host.Value}/about.json/Params", Params.Id);
        }

        #endregion ROUTES
    }
}