using webapi.Models.HR;
using webapi.Models.Views;
using webapi.Models;
using AutoMapper;

namespace webapi.Services.HR
{
    public interface IEmployeeContractService
    {
        public bool SetContractToUnactive(long employeeId);
    }
    public class EmployeeContractService : IEmployeeContractService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public EmployeeContractService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool SetContractToUnactive(long employeeId)
        {
            var employeeContract = _context.EmployeeContracts
                .Where(x => x.EmployeeId == employeeId)
                .Where(x => x.IsActive == true)
                .FirstOrDefault();

            if (employeeContract != null)
            {
                employeeContract.IsActive = false;
                _context.Update(employeeContract);

                var changes = _context.SaveChanges();
                if (changes == 0)
                {
                    return false;
                }
            }

            //if no active contract is found, then the contract is inactive
            return true;
        }
    }
}
