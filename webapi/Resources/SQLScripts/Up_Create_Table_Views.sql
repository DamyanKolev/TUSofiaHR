CREATE VIEW employee_v
AS
  SELECT employee.id                         AS employee_id,
         employee.first_name,
         employee.middle_name,
         employee.surname,
         contracts.working_wage,
         contracts.work_time,
         contracts.annual_leave,
         employee.company_employee_id,
         personal_datas.egn,
         manager.first_name                  AS manager_first_name,
         departments.department_name,
         contracts.id                        AS contract_id,
         contracts.conclusion_date,
         contracts.execution_date,
         contracts.contract_term,
         contracts.additional_agreement_date,
         contracts.termination_date,
         contracts.change_date,
         contracts.article62_flag,
         employee.article123_flag,
         companies.company_name,
         companies.company_eic,
         positions.position_name,
         sys_positions.position_name         AS state_position_name,
         sys_positions.npkd_id,
         sys_iconomic_activities.activity_name,
         sys_iconomic_activities.nkid_id,
         sys_contract_termination_types.code AS termination_code,
         sys_administrative_territories.ekatte,
         sys_contract_types.contract_type,
         sys_contract_types.code             AS contract_type_code,
         sys_contract_document_types.document_type,
         sys_contract_document_types.code    AS document_code,
         contracts.code_corection
  FROM   employees employee
         LEFT JOIN employees manager
                ON employee.id = manager.manager_id
         JOIN employee_contracts
           ON employee.id = employee_contracts.employee_id
         JOIN contracts
           ON contracts.id = employee_contracts.contract_id
         JOIN departments
           ON departments.id = employee.department_id
         LEFT JOIN positions
                ON positions.id = employee.position_id
         JOIN companies
           ON companies.id = employee.company_id
         JOIN personal_datas
           ON personal_datas.id = employee.personal_data_id
         JOIN sys_positions
           ON sys_positions.id = contracts.position_id
         JOIN sys_iconomic_activities
           ON sys_iconomic_activities.id = contracts.iconomic_activity_id
         LEFT JOIN sys_contract_termination_types
                ON sys_contract_termination_types.id =
                   contracts.termination_type_id
         JOIN sys_administrative_territories
           ON sys_administrative_territories.id =
              contracts.administrative_territory_id
         JOIN sys_contract_types
           ON sys_contract_types.id = contracts.contract_type_id
         JOIN sys_contract_document_types
           ON sys_contract_document_types.id = contracts.document_type_id; 