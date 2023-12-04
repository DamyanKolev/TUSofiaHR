using System.Net;
using webapi.Models.HR;

namespace webapi.Models
{
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

    public struct ResponseWithStatus<T>
    {
        public HttpStatusCode StatusCode { get; set; }
        public T Response { get; set; }

        public ResponseWithStatus(HttpStatusCode statusCode, T response) { 
            StatusCode = statusCode;
            Response = response;
        }
    }

    public struct Response
    {
        public string Message { get; set; }

        public Response(string message) { 
            Message = message;
        }
    }

    public struct DataResponse<T>
    {
        public string Message { get; set; }
        public T Data { get; set; }


        public DataResponse(string message, T data) { 
            Message = message;
            Data = data;
        }
    }
}
