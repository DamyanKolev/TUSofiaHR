using webapi.Models.HR;
using webapi.Models;
using System.Net;
using webapi.Constants;
using AutoMapper;

namespace webapi.Services.HR
{
    public interface IPositionService
    {
        public ResponseWithStatus<Response> CreatePosition(PositionRequest insertRequest);
        public ResponseWithStatus<Response> UpdatePosition(PositionUpdateRequest updateRequest);
        public ResponseWithStatus<Response> DeletePosition(int positionId);
    }
    public class PositionService : IPositionService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;
        public PositionService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ResponseWithStatus<Response> CreatePosition(PositionRequest insertRequest)
        {
            var position = _mapper.Map<Position>(insertRequest);
            _context.Positions.Add(position);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }



        public ResponseWithStatus<Response> UpdatePosition(PositionUpdateRequest updateRequest)
        {
            var position = _context.Departments.Find(updateRequest.PositionId);

            if (position == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateRequest.PositionRequest, position);
            _context.Update(position);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }


        public ResponseWithStatus<Response> DeletePosition(int positionId)
        {
            var position = _context.Positions.Find(positionId);

            if (position == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _context.Positions.Remove(position);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_DELETE_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_DELETE_SUCCESS);
        }
    }
}
