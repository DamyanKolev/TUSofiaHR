INSERT INTO addresses (street_address, postal_code, district, municipilaty, region, populated_place)
VALUES 
	('ул. Тодор Каблешков',2022, 'Гоце Делчев', 'Столична', 'София', 'София'),
	('ул. Петър Горанов',2022, 'Люлин', 'Столична', 'София', 'София');



INSERT INTO departments (department_name)
VALUES 
	('Web Application');


INSERT INTO department_teams (team_name, department_id)
VALUES 
	('Frontend', 1),
	('Backend', 1);


INSERT INTO personal_data (identity_text, identity_code, address_id)
VALUES 
	('c', 0, 1),
	('0055244112', 0, 2);


INSERT INTO insurances (doo_withouth_tzpb_insurer, doo_withouth_tzpb_employee, health_insurance, health_insurance_article40, health_insurance_insurer, health_insurance_employee, teacher_pension_fund, professional_pension_fund, universal_pension_insurer, universal_pension_employee, insurance_type_id)
VALUES 
	('14.80', '0.00', '8.00', '8.00', '8.00', '0.00', '0.00', '12.00', '5.00', '0.00', 4),
	('14.80', '0.00', '8.00', '8.00', '8.00', '0.00', '0.00', '12.00', '5.00', '0.00', 4);


INSERT INTO positions (position_name, min_salary, max_salary)
VALUES 
	('Junior Frontend Dev', '1500', '2000'),
	('Junior Backend Dev', '1300', '1800');


INSERT INTO employees (first_name, middle_name, surname, email, phone_number, company_employee_id, personal_data_id, department_team_id, position_id, insurance_id)
VALUES 
	('Асен', 'Кирилов', 'Димитров', 'asenkirilov@test.com', '08433449891', 123, 1, 1, 1, 1),
	('Петър', 'Димитров', 'Иванов', 'asenkirilov@test.com', '08433449891', 222, 2, 2, 2, 2);


INSERT INTO contracts (working_wage, work_time, annual_leave, conclusion_date, execution_date, contract_type_id, sys_position_id, sys_iconomic_activity_id, document_type_id, sys_administrative_territory_id, code_corection, is_annex, company_eic)
VALUES 
	('1800.00', 40, 30, '2024-04-18', '2024-04-19', 5, 555, 234, 1, 555, 0, False, '2243424232'),
	('1500.00', 40, 30, '2024-04-20', '2024-04-21', 5, 333, 343, 1, 666, 0, False, '2243424232');


INSERT INTO employee_contracts (employee_id, contract_id, is_active)
VALUES 
	(1, 1, False),
	(2, 2, False);


INSERT INTO companies (company_name, company_eic)
VALUES 
	('Test Company', '2243424232');