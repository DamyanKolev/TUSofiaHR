CREATE VIEW EmployeeView AS
SELECT 
	Employee.Id as EmployeeId,
    	Employee.FirstName,
    	Employee.MiddleName,
    	Employee.Surname,
	Contracts.WorkingWage,
	Contracts.WorkTime,
	Contracts.AnnualLeave,
	Employee.CompanyEmployeeId,
	PersonalData.EGN,
	Manager.FirstName as ManagerFirstName,
	Departments.DepartmentName,
	Contracts.Id as ContractId,
    	Contracts.ConclusionDate,
    	Contracts.ExecutionDate,
	Contracts.ContractTerm,
	Contracts.AdditionalAgreementDate,
    	Contracts.TerminationDate,
	Contracts.ChangeDate,
    	Contracts.Article62Flag,
    	Employee.Article123Flag,
	Companies.CompanyName,
	Companies.CompanyEic,
	Positions.PositionName,
	SysPositions.PositionName as StatePositionName,
	SysPositions.NPKDId,
	SysIconomicActivitys.ActivityName,
	SysIconomicActivities.NkidId,
	SysContractTerminationTypes.Code as TerminationCode,
	SysAdministrativeTerritories.Ekatte,
	SysContractTypes.ContractType,
	SysContractTypes.Code as ContractTypeCode,
	SysContractDocumentTypes.DocumentType,
	SysContractDocumentTypes.Code as DocumentCode,
	Contracts.code_corection
FROM Employees Employee
	LEFT JOIN Employees Manager ON Employee.Id = Manager.ManagerId
	JOIN EmployeeContracts ON Employee.Id = EmployeeContracts.EmployeeId
	JOIN Contracts ON Contracts.Id = EmployeeContracts.ContractId
	JOIN Departments ON Departments.Id = Employee.DepartmentId
	LEFT JOIN Positions ON Positions.Id = Employee.PositionId
	JOIN Companies ON Companies.Id = Employee.CompanyId
	JOIN PersonalData ON PersonalData.Id = Employee.PersonalDataId
	JOIN SysPositions ON SysPositions.Id = Contracts.SysPositionId
	JOIN SysIconomicActivities ON SysIconomicActivities.Id = Contracts.SysIconomicActivityId
	LEFT JOIN SysContractTerminationTypes ON SysContractTerminationTypes.id = Contracts.TerminationTypeId
	JOIN SysAdministrativeTerritories ON SysAdministrativeTerritories.Id = Contracts.SysAdministrativeTerritoryId
	JOIN SysContractTypes ON SysContractTypes.Id = Contracts.ContractTypeId
	JOIN SysContractDocumentTypes ON SysContractDocumentTypes.Id = Contracts.DocumentTypeId;
