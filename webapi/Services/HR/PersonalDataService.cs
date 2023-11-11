using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using webapi.Constants;

namespace webapi.Services.HR
{
    public interface IPersonalDataService
    {
        public Response CreatePersonalData(PersonalDataInsertRequest insertRequest);
        public Response UpdatePersonalData(PersonalDataUpdateRequest updateRequest);
    }
    public class PersonalDataService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public PersonalDataService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public Response CreatePersonalData(PersonalDataInsertRequest insertRequest)
        {
            var data = _mapper.Map<PersonalData>(insertRequest);
            var result = _context.PersonalDatas.Add(data);

            if (result != null)
            {
                return new Response("Created", MessageConstants.MESSAGE_INSERT_SUCCESS);
            }

            _context.SaveChanges();

            return new Response("Created", MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public Response UpdatePersonalData(PersonalDataUpdateRequest updateRequest)
        {
            var product = _context.PersonalDatas.Find(updateRequest.UpdateId);

            if (product != null)
            {
                _mapper.Map(updateRequest.Data, product);
                var changes = _context.SaveChanges();

                if (changes > 0)
                {
                    return new Response("Failed", MessageConstants.MESSAGE_UPDATE_FAILED);
                }

                return new Response("Success", MessageConstants.MESSAGE_UPDATE_SUCCESS);
            }

            return new Response("Failed", MessageConstants.MESSAGE_UPDATE_FAILED);
        }
    }
}
