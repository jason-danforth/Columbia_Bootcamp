--Create departments table and import CSV
CREATE TABLE departments (
	dept_id SERIAL PRIMARY KEY,
	dept_num VARCHAR(30) NOT NULL,
	dept_name VARCHAR(100) NOT NULL
);



--Create employees table and import CSV
CREATE TABLE employees (
	empl_id SERIAL PRIMARY KEY,
	empl_num INT NOT NULL,
	birth_date DATE NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	gender VARCHAR(1) NOT NULL,
	hire_date DATE NOT NULL
);



--Create department_emplpoyees table, import CSV, update/link foreign keys, and drop unneccesary columns
CREATE TABLE department_employees (
	dept_empl_id SERIAL PRIMARY KEY,
	empl_id INT,
    dept_id INT,
    empl_num INT NOT NULL,
	dept_num VARCHAR(30) NOT NULL,
	from_date DATE NOT NULL,
	to_date DATE NOT NULL,
	FOREIGN KEY (empl_id) REFERENCES employees(empl_id),
	FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

UPDATE department_employees
SET empl_id = employees.empl_id
FROM employees
WHERE department_employees.empl_num = employees.empl_num

UPDATE department_employees
SET dept_id = departments.dept_id
FROM departments
WHERE department_employees.dept_num = departments.dept_num

ALTER TABLE department_employees 
DROP COLUMN empl_num,
DROP COLUMN dept_num;



--Create department_emplpoyees table, import CSV, update/link foreign keys, and drop unneccesary columns
CREATE TABLE department_manager (
	dept_man_id SERIAL PRIMARY KEY,
	dept_id INT,
	empl_id INT,
    dept_num VARCHAR(10) NOT NULL,
    empl_num INT NOT NULL,
	from_date DATE NOT NULL,
	to_date DATE NOT NULL,
	FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
	FOREIGN KEY (empl_id) REFERENCES employees(empl_id)
);

UPDATE department_manager
SET dept_id = departments.dept_id
FROM departments
WHERE department_manager.dept_num = departments.dept_num;

UPDATE department_manager
SET empl_id = employees.empl_id
FROM employees
WHERE department_manager.empl_num = employees.empl_num;

ALTER TABLE department_manager
DROP COLUMN dept_num,
DROP COLUMN empl_num;



--Create salaries table, import CSV, update/link foreign keys, and drop unneccesary columns
CREATE TABLE salaries (
	sal_id SERIAL PRIMARY KEY,
	empl_id INT,
    empl_num INT NOT NULL,
	salary INT NOT NULL,
	from_date DATE NOT NULL,
	to_date DATE NOT NULL,
	FOREIGN KEY (empl_id) REFERENCES employees(empl_id)
);

UPDATE salaries
SET empl_id = employees.empl_id
FROM employees
WHERE salaries.empl_num = employees.empl_num

ALTER TABLE salaries
DROP COLUMN empl_num;



--Create titles table, import CSV, update/link foreign keys, and drop unneccesary columns
CREATE TABLE titles (
	title_id SERIAL PRIMARY KEY,
	empl_id INT,
    empl_num INT NOT NULL, 
	title VARCHAR(100) NOT NULL,
	from_date DATE NOT NULL,
	to_date DATE NOT NULL,
	FOREIGN KEY (empl_id) REFERENCES employees(empl_id)
);

UPDATE titles
SET empl_id = employees.empl_id
FROM employees
WHERE titles.empl_num = employees.empl_num

ALTER TABLE titles
DROP COLUMN empl_num



