CREATE TABLE tests(
test_id VARCHAR(50) PRIMARY KEY,
user_id VARCHAR(50),
timeframe varchar(100),
createdAt  datetime DEFAULT current_timestamp,
FOREIGN KEY(user_id) REFERENCES users(u_id)
);