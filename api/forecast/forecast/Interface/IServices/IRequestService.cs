namespace forecast.Interface.IServices
{
    public interface IRequestService
    {
         Task<string> Request(string address);
    }
}
