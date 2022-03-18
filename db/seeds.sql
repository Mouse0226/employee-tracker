INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', 100000.00, 1),
  ('Salesperson', 80000.00, 1),
  ('Lead Engineer', 180000.00, 2),
  ('Software Engineer', 150000.00, 2),
  ('Account Manager', 120000.00, 3),
  ('Accountant', 100000.00, 3),
  ('Legal Team Lead', 210000.00, 4),
  ('Lawyer', 180000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Debbie', 'Chavez', 1, NULL),
  ('Casey', 'Harmon', 2, 1),
  ('Amanda', 'Bailey', 2, 1),
  ('Alex', 'Gay', 3, NULL),
  ('Karen', 'Lutz', 4, 4),
  ('Heidi', 'Gonzales', 4, 4),
  ('Eugene', 'Lawrence', 5, NULL),
  ('Christine', 'Pacheco', 6, 7),
  ('Theresa', 'Thompson', 6, 7),
  ('Matthew', 'Dominguez', 7, NULL),
  ('William', 'Ramos', 8, 10),
  ('Alex', 'Payne', 8, 10);