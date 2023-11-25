using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using webapi.Constants;
using System.Net;

namespace webapi.Services.HR
{
    public interface IPersonalDataService
    {
        public ResponseWithStatus<Response> CreatePersonalData(PersonalDataInsertRequest insertRequest);
        public ResponseWithStatus<Response> UpdatePersonalData(PersonalDataUpdateRequest updateRequest);
    }
    public class PersonalDataService : IPersonalDataService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public PersonalDataService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public ResponseWithStatus<Response> CreatePersonalData(PersonalDataInsertRequest insertRequest)
        {
            var data = _mapper.Map<PersonalData>(insertRequest);
            _context.PersonalDatas.Add(data);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdatePersonalData(PersonalDataUpdateRequest updateRequest)
        {
            var personalData = _context.Employees.Find(updateRequest.UpdateId);

            if (personalData == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateRequest.Data, personalData);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }
    }
}
