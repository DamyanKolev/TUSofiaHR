using System.Net;
using webapi.Models.HR;

namespace webapi.Models
{
    public record struct ResponseWithStatus<T> (HttpStatusCode StatusCode, T Response);
    public record struct Response (string Message);
    public record struct DataResponse<T> (string Message, T Data);


    public static class ResponseBuilder
    {
        public static ResponseWithStatus<Response> CreateResponseWithStatus(HttpStatusCode statusCode, string message)
        {
            return new ResponseWithStatus<Response>(
                statusCode,
                new Response(message)
           );
        }
        public static ResponseWithStatus<DataResponse<T>> CreateDataResponseWithStatus<T>(HttpStatusCode statusCode, string message, T data)
        {
            return new ResponseWithStatus<DataResponse<T>>(
                statusCode,
                new DataResponse<T>(
                    message,
                    data
                )
           );
        }
    }
}
