using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using webapi.Constants;
using System.Net;

namespace webapi.Services.HR
{
    public interface IPersonalDataService
    {
        public ResponseWithStatus<Response> CreatePersonalData(PersonalDataDTO personalDataDTO);
        public ResponseWithStatus<Response> UpdatePersonalData(PersonalDataUpdateDTO updateDTO);
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
        public ResponseWithStatus<Response> CreatePersonalData(PersonalDataDTO personalDataDTO)
        {
            var data = _mapper.Map<PersonalData>(personalDataDTO);
            _context.PersonalDatas.Add(data);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdatePersonalData(PersonalDataUpdateDTO updateDTO)
        {
            var personalData = _context.PersonalDatas.Find(updateDTO.UpdateId);

            if (personalData == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateDTO.PersonalData, personalData);
            _context.Update(personalData);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }
    }
}
