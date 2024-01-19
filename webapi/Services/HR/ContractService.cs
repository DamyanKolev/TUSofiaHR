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
        public ResponseWithStatus<DataResponse<PageResponse<ContractView>>> GetContractsPage(PageInfo pageInfo);
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
            var contract = _context.Contracts.Find(updateDTO.UpdateId);

            if (contract == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateDTO.Contract, contract);
            _context.Update(contract);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }


        public ResponseWithStatus<DataResponse<PageResponse<ContractView>>> GetContractsPage(PageInfo pageInfo)
        {
            var contracts = _context.ContractV
                .Select(v => _mapper.Map<ContractView>(v))
                .OrderBy(p => p.ContractId)
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();
            
            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<ContractView> pageResponse = new (pages, countRecords, contracts);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }
    }
}
