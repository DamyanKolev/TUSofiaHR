using webapi.Models.HR;
using webapi.Models;
using webapi.Constants;
using AutoMapper;
using System.Net;
using webapi.Models.Views;

namespace webapi.Services.HR
{
    public interface IContractService
    {
        public ResponseWithStatus<Response> CreateContract(ContractDTO contractDTO);
        public ResponseWithStatus<Response> UpdateContract(ContractUpdateDTO updateDTO);
        public ResponseWithStatus<DataResponse<List<ContractView>>> GetContractsPage(PageInfo pageInfo);
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

        public ResponseWithStatus<Response> CreateContract(ContractDTO contractDTO)
        {
            var data = _mapper.Map<Contract>(contractDTO);
            _context.Contracts.Add(data);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdateContract(ContractUpdateDTO updateDTO)
        {
            var contract = _context.Employees.Find(updateDTO.UpdateId);

            if (contract == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            var contractToPatch = _mapper.Map<ContractDTO>(contract);
            updateDTO.Contract.ApplyTo(contractToPatch);

            _mapper.Map(contractToPatch, contract);
            _context.Update(contract);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }


        public ResponseWithStatus<DataResponse<List<ContractView>>> GetContractsPage(PageInfo pageInfo)
        {
            var contracts = _context.EmployeeV
                .Select(v => _mapper.Map<ContractView>(v))
                .OrderBy(p => p.ContractId)
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, contracts);
        }
    }
}
