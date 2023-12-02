using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using System.Net;
using webapi.Constants;
using System.Diagnostics.Contracts;

namespace webapi.Services.HR
{
    public interface ICompanyService
    {
        public ResponseWithStatus<Response> CreateCompany(CompanyRequest insertRequest);
        public ResponseWithStatus<Response> UpdateCompany(CompanyUpdateRequest updateRequest);
    }
    public class CompanyService : ICompanyService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public CompanyService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public ResponseWithStatus<Response> CreateCompany(CompanyRequest insertRequest)
        {
            var data = _mapper.Map<Company>(insertRequest);
            _context.Companies.Add(data);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdateCompany(CompanyUpdateRequest updateRequest)
        {
            var company = _context.Employees.Find(updateRequest.UpdateId);

            if (company == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateRequest.CompanyRequest, company);
            _context.Update(company);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }
    }
}
