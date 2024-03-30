using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using System.Net;
using webapi.Constants;

namespace webapi.Services.HR
{
    public interface IAddressService
    {
        public ResponseWithStatus<Response> CreateAddress(AddressDTO addressDTO);
    }
    public class AddressService : IAddressService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public AddressService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ResponseWithStatus<Response> CreateAddress(AddressDTO addressDTO)
        {
            var address = _mapper.Map<Address>(addressDTO);
            _context.Addresses.Add(address);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }
    }
}
