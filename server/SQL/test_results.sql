CREATE TABLE tests_results(
    tr_id VARCHAR(50) PRIMARY KEY,
    test_id varchar(50),
    total_marks int,
    obtained_marks int,
    createdAt datetime DEFAULT current_timestamp,
    FOREIGN KEY(test_id) REFERENCES tests(test_id)
   );