--Query 1
SELECT empl_num, last_name, first_name, gender, salary 
FROM employees
JOIN salaries ON employees.empl_id = salaries.empl_id 


--Query 2
SELECT first_name, last_name, hire_date
FROM employees
WHERE EXTRACT(year FROM hire_date) = 1986


--Query 3
SELECT dept_num, dept_name, empl_num, last_name, first_name, from_date, to_date
FROM department_manager
JOIN departments ON department_manager.dept_id = departments.dept_id
JOIN employees ON department_manager.empl_id = employees.empl_id


--Query 4
SELECT empl_num, last_name, first_name, dept_name
FROM employees
JOIN department_employees ON employees.empl_id = department_employees.empl_id
JOIN departments ON department_employees.dept_id = departments.dept_id
ORDER BY empl_num ASC


--Query 5
Select first_name, last_name
FROM employees
WHERE first_name = 'Hercules'
AND POSITION('B' in last_name) = 1


--Query 6
Select empl_num, first_name, last_name, dept_name
FROM department_employees AS dept_empl
JOIN departments AS depts ON dept_empl.dept_id = depts.dept_id
JOIN employees AS empls ON dept_empl.empl_id = empls.empl_id
WHERE dept_empl.dept_id = 7


--Query 7
Select empl_num, first_name, last_name, dept_name
FROM department_employees AS dept_empl
JOIN departments AS depts ON dept_empl.dept_id = depts.dept_id
JOIN employees AS empls ON dept_empl.empl_id = empls.empl_id
WHERE dept_empl.dept_id = 7
OR dept_empl.dept_id = 5


--Query 8
SELECT last_name, COUNT(*) AS row_count
FROM employees
GROUP BY last_name
ORDER BY row_count DESC;