using webapi.Models.HR;

namespace webapi.Models
{
    public class Response
    {
        public string Status { get; set; }
        public string Message { get; set; }

        public Response(string status, string message) { 
            Status = status;
            Message = message;
        }
    }

    public class DataResponse<T>
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }


        public DataResponse(string status, string message, T data) { 
            Status = status;
            Message = message;
            Data = data;
        }
    }
}
