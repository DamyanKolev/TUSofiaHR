CREATE VIEW employee_v AS
SELECT
  e1.id AS employee_id,
  CONCAT(e1.first_name, ' ', e1.middle_name, ' ', e1.surname) AS employee_name,
  e1.email,
  e1.phone_number,
  CONCAT(e2.first_name, ' ', e2.middle_name, ' ', e2.surname) AS manager_name,
  dp.department_name,
  pos.position_name,
  e1.personal_data_id,
  e1.manager_id,
  e1.department_id,
  e1.company_id,
  e1.position_id,
  e1.article123_flag,
  con.id AS contract_id
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id
JOIN departments dp ON dp.id = e1.department_id
JOIN positions pos ON pos.id = e1.position_id
JOIN employee_contracts em_c ON em_c.employee_id = e1.id
JOIN contracts con ON em_c.contract_id = con.id
WHERE em_c.is_active
ORDER BY e1.id ASC;





GO




CREATE VIEW contract_v AS
SELECT
  c1.id AS contract_id,
  CONCAT(e1.first_name, ' ', e1.middle_name, ' ', e1.surname) AS employee_name,
  e1.first_name,
  e1.middle_name,
  e1.surname,
  c1.working_wage,
  c1.work_time,
  c1.annual_leave,
  pd1.egn,
  c1.conclusion_date,
  c1.execution_date,
  c1.contract_term,
  c1.additional_agreement_date,
  c1.termination_date,
  c1.is_terminate,
  c1.article62_flag,
  c1.code_corection,
  com1.company_eic,
  sp.position_name as position_name,
  sp.npkd_id,
  sia.activity_name,
  sia.nkid_id,
  sctt.code as termination_code,
  sat.ekatte,
  sct.contract_type,
  sct.code as contract_type_code,
  scdt.document_type,
  scdt.code as document_code
FROM contracts c1
JOIN employee_contracts ec1 ON ec1.contract_id = c1.id
JOIN employees e1 ON e1.id = ec1.employee_id
JOIN companies com1 ON com1.id = e1.company_id
JOIN personal_datas pd1 ON pd1.id = e1.personal_data_id
JOIN sys_positions sp ON sp.id = c1.position_id
JOIN sys_iconomic_activities sia ON sia.id = c1.iconomic_activity_id
LEFT JOIN sys_contract_termination_types sctt ON sctt.id = c1.termination_type_id
JOIN sys_administrative_territories sat ON sat.id = c1.administrative_territory_id
JOIN sys_contract_types sct ON sct.id = c1.contract_type_id
JOIN sys_contract_document_types scdt ON scdt.id = c1.document_type_id
ORDER BY c1.id ASC;
