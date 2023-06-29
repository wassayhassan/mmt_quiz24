CREATE TABLE subjects(
  subject_id VARCHAR(50),
  name VARCHAR(255) NOT NULL,
  createdAt datetime DEFAULT current_timestamp
);
ALTER TABLE subjects ADD INDEX idx_subject_id (subject_id);

insert into subjects(subject_id, name) values('H', 'Algebra'),('Pr', 'Advanced Math'),('Pa', 'Problem Solving and Data Analysis'),('Ad', 'Geometry and Trigonometry');