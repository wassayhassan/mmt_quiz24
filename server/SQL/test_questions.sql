create table test_questions(
  tq_id varchar(50) PRIMARY KEY,
  item_id varchar(9)  DEFAULT NULL,
  test_id varchar(50),
  answered boolean,
  is_correct boolean,
  createdAt datetime DEFAULT current_timestamp,
  FOREIGN KEY(test_id) REFERENCES tests(test_id)
);