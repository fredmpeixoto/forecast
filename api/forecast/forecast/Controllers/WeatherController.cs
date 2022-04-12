using forecast.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace forecast.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherController : ControllerBase
    {


        private IRequestService _requestService;
        public WeatherController(IRequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get( string address)
        {
            try
            {
                var result = await _requestService.Request(address);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        
        }
    }
}