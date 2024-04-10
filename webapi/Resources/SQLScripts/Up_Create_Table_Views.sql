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
  e1.position_id,
  sit.code AS insurance_type_code
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id
JOIN departments dp ON dp.id = e1.department_id
JOIN positions pos ON pos.id = e1.position_id
LEFT JOIN insurances ins ON e1.insurance_id = ins.id
LEFT JOIN sys_insurance_types sit ON ins.sys_insurance_type_id = sit.id
ORDER BY e1.id ASC;




CREATE VIEW insurance_v AS
SELECT
  e1.id AS employee_id,
  e1.surname,
  CONCAT(e1.first_name, ' ', e1.middle_name, ' ', e1.surname) AS employee_name,
  e1.email,
  e1.phone_number,
  CONCAT(SUBSTRING(e1.first_name, 1, 1), SUBSTRING(e1.surname, 1, 1)) as initials,
  pd1.identity_text,
  pd1.identity_code,
  con.working_wage,
  con.execution_date,
  con.company_eic,
  ins.doo_withouth_tzpb_insurer,
  ins.doo_withouth_tzpb_employee,
  ins.health_insurance,
  ins.health_insurance_article40,
  ins.health_insurance_insurer,
  ins.health_insurance_employee,
  ins.teacher_pension_fund,
  ins.professional_pension_fund,
  ins.universal_pension_insurer,
  ins.universal_pension_employee,
  sit.gvrc_fund,
  sit.dod_tax,
  SUBSTRING(sp.nkpd, 1, 1) as nkpd_group,
  sia.nkid,
  sia.nkid_sector,
  sia.tzpb_percent,
  sit.code as insurance_type_code
FROM employees e1
JOIN employee_contracts em_c ON em_c.employee_id = e1.id
JOIN contracts con ON em_c.contract_id = con.id
LEFT JOIN contracts anex_c ON anex_c.id = con.contract_id
JOIN personal_data pd1 ON pd1.id = e1.personal_data_id
JOIN insurances ins ON e1.insurance_id = ins.id
JOIN sys_positions sp ON sp.id = CASE WHEN con.sys_position_id IS NULL THEN anex_c.sys_position_id ELSE con.sys_position_id END 
JOIN sys_iconomic_activities sia ON sia.id = CASE WHEN con.sys_position_id IS NULL THEN anex_c.sys_iconomic_activity_id ELSE con.sys_iconomic_activity_id END
JOIN sys_insurance_types sit ON sit.id = ins.sys_insurance_type_id
WHERE em_c.active
ORDER BY e1.id ASC;







CREATE VIEW contract_v AS
SELECT
  c1.id AS contract_id,
  e1.id AS employee_id,
  CONCAT(e1.first_name, ' ', e1.middle_name, ' ', e1.surname) AS employee_name,
  e1.first_name,
  e1.middle_name,
  e1.surname,
  c1.working_wage,
  c1.work_time,
  c1.annual_leave,
  pd1.identity_text,
  pd1.identity_code,
  c1.conclusion_date,
  c1.execution_date,
  c1.contract_term,
  c1.additional_agreement_date,
  c1.termination_date,
  c1.is_terminate,
  c1.article62_flag,
  c1.code_corection,
  c1.company_eic,
  sp.position_name as position_name,
  sp.nkpd,
  sia.activity_name,
  sia.nkid,
  sctt.code as termination_code,
  sat.ekatte,
  sct.contract_type,
  sct.code as contract_type_code,
  scdt.document_type,
  scdt.code as document_code,
  sit.code AS insurance_type_code
FROM contracts c1
JOIN employee_contracts ec1 ON ec1.contract_id = c1.id
JOIN employees e1 ON e1.id = ec1.employee_id
JOIN personal_data pd1 ON pd1.id = e1.personal_data_id
LEFT JOIN sys_positions sp ON sp.id = c1.sys_position_id
LEFT JOIN sys_iconomic_activities sia ON sia.id = c1.sys_iconomic_activity_id
LEFT JOIN sys_contract_termination_types sctt ON sctt.id = c1.termination_type_id
LEFT JOIN sys_administrative_territories sat ON sat.id = c1.sys_administrative_territory_id
JOIN sys_contract_types sct ON sct.id = c1.contract_type_id
JOIN sys_contract_document_types scdt ON scdt.id = c1.document_type_id
LEFT JOIN insurances ins ON e1.insurance_id = ins.id
LEFT JOIN sys_insurance_types sit ON ins.sys_insurance_type_id = sit.id
ORDER BY c1.id ASC;








CREATE VIEW annex_v AS
SELECT
  c1.id AS contract_id,
  e1.id as employee_id,
  c1.conclusion_date,
  c1.execution_date,
  c1.contract_term,
  c1.additional_agreement_date,
  c1.termination_date,
  c1.is_terminate,
  c1.article62_flag,
  sp.position_name as position_name,
  sp.nkpd,
  sia.activity_name,
  sia.nkid,
  sctt.code as termination_code,
  sat.ekatte,
  sct.contract_type,
  sct.code as contract_type_code,
  scdt.document_type,
  sit.code AS insurance_type_code
FROM contracts c1
JOIN employee_contracts ec1 ON ec1.contract_id = c1.contract_id
JOIN employees e1 ON e1.id = ec1.employee_id
LEFT JOIN sys_positions sp ON sp.id = c1.sys_position_id
LEFT JOIN sys_iconomic_activities sia ON sia.id = c1.sys_iconomic_activity_id
LEFT JOIN sys_contract_termination_types sctt ON sctt.id = c1.termination_type_id
LEFT JOIN sys_administrative_territories sat ON sat.id = c1.sys_administrative_territory_id
JOIN sys_contract_types sct ON sct.id = c1.contract_type_id
JOIN sys_contract_document_types scdt ON scdt.id = c1.document_type_id
LEFT JOIN insurances ins ON e1.insurance_id = ins.id
LEFT JOIN sys_insurance_types sit ON ins.sys_insurance_type_id = sit.id
WHERE c1.is_annex
ORDER BY c1.id ASC;