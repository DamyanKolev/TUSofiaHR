using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using System.Net;
using webapi.Constants;

namespace webapi.Services.HR
{
    public interface ICompanyService
    {
        public ResponseWithStatus<Response> CreateCompany(CompanyDTO companyDTO);
        public ResponseWithStatus<Response> UpdateCompany(CompanyUpdateDTO updateDTO);
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
        public ResponseWithStatus<Response> CreateCompany(CompanyDTO companyDTO)
        {
            var data = _mapper.Map<Company>(companyDTO);
            _context.Companies.Add(data);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdateCompany(CompanyUpdateDTO updateDTO)
        {
            var company = _context.Employees.Find(updateDTO.UpdateId);

            if (company == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            var companyToPatch = _mapper.Map<CompanyDTO>(company);
            updateDTO.Company.ApplyTo(companyToPatch);

            _mapper.Map(companyToPatch, company);
            _context.Update(company);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }
    }
}
