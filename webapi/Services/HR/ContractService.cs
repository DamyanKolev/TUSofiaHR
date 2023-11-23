using webapi.Models.HR;
using webapi.Models;
using webapi.Constants;
using AutoMapper;
using static webapi.Models.HR.EmployeeUpdate;
using System.Net;

namespace webapi.Services.HR
{
    public interface IContractService
    {
        public ResponseWithStatus<Response> CreateContract(ContractInsertRequest insertRequest);
        public ResponseWithStatus<Response> UpdateContract(ContractUpdateRequest updateRequest);
        public ResponseWithStatus<DataResponse<List<Contract>>> PageSelectContracts(int pageNumber, int pageSize);
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

        public ResponseWithStatus<Response> CreateContract(ContractInsertRequest insertRequest)
        {
            var data = _mapper.Map<Contract>(insertRequest);
            _context.Contracts.Add(data);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdateContract(ContractUpdateRequest updateRequest)
        {
            var product = _context.Contracts.Find(updateRequest.UpdateId);

            if (product != null)
            {
                _mapper.Map(updateRequest.Data, product);
                var changes = _context.SaveChanges();

                if (changes > 0)
                {
                    return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
                }

                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
        }


        public ResponseWithStatus<DataResponse<List<Contract>>> PageSelectContracts(int pageNumber, int pageSize)
        {
            var contracts = _context.Contracts
                .OrderBy(p => p.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, contracts);
        }
    }
}
