using forecast.Interface.IServices;

namespace forecast.Services
{
    public class RequestService: IRequestService {

        static readonly HttpClient client = new HttpClient();

        public async Task<string> Request(string address)
        {
            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                //ex 1600+Amphitheatre+Parkway+Mountain+View,+CA+9404
                string url = $"https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address={address}&benchmark=4&format=json";
                string responseBody = await client.GetStringAsync(url);

                return responseBody;
            }
            catch (HttpRequestException e)
            {
                throw  e;
            }

        }
}
}
