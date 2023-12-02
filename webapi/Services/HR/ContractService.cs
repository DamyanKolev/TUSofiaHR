﻿using webapi.Models.HR;
using webapi.Models;
using webapi.Constants;
using AutoMapper;
using System.Net;

namespace webapi.Services.HR
{
    public interface IContractService
    {
        public ResponseWithStatus<Response> CreateContract(ContractDTO insertRequest);
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

        public ResponseWithStatus<Response> CreateContract(ContractDTO insertRequest)
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
            var contract = _context.Employees.Find(updateRequest.UpdateId);

            if (contract == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateRequest.Data, contract);
            _context.Update(contract);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
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
