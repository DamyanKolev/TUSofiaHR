using webapi.Models.HR;
using webapi.Models;
using webapi.Constants;
using AutoMapper;
using static webapi.Models.HR.EmployeeUpdate;

namespace webapi.Services.HR
{
    public interface IContractService
    {
        public Response CreateContract(ContractInsertRequest insertRequest);
        public Response UpdateContract(ContractUpdateRequest updateRequest);
        public DataResponse<List<Contract>> PageSelectContracts(int pageNumber, int pageSize);
    }

    public class ContractService : IContractService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public ContractService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Response CreateContract(ContractInsertRequest insertRequest)
        {
            var data = _mapper.Map<Contract>(insertRequest);
            var result = _context.Contracts.Add(data);

            if (result != null)
            {
                return new Response("Created", MessageConstants.MESSAGE_INSERT_SUCCESS);
            }

            _context.SaveChanges();

            return new Response("Created", MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public Response UpdateContract(ContractUpdateRequest updateRequest)
        {
            var product = _context.Contracts.Find(updateRequest.UpdateId);

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


        public DataResponse<List<Contract>> PageSelectContracts(int pageNumber, int pageSize)
        {
            var contracts = _context.Contracts
                .OrderBy(p => p.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new DataResponse<List<Contract>>("OK", MessageConstants.MESSAGE_SUCCESS_SELECT, contracts);

            return response;
        }
    }
}
