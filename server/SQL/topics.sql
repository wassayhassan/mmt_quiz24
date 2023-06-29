CREATE TABLE topics(
  topic_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  subject_id VARCHAR(50),
  FOREIGN KEY(subject_id) REFERENCES subjects(subject_id),
  createdAt datetime DEFAULT current_timestamp
);

INSERT INTO topics (topic_id, subject_id, name) VALUES
  -- Heart of Algebra
  ('H1', 'H', 'Linear equations in one variable'),
  ('H2', 'H', 'Linear equations in two variables'),
  ('H3', 'H', 'Linear functions'),
  ('H4', 'H', 'Systems of two linear equations in two variables'),
  ('H5', 'H', 'Linear inequalities in one or two variables'),

  -- Problem Solving and Data Analysis
  ('Pr1', 'Pr', 'Equivalent expressions'),
  ('Pr2', 'Pr', 'Nonlinear equations in one variable and systems of equations in two variables'),
  ('Pr3', 'Pr', 'Nonlinear functions'),

  -- Passport to Advanced Math
  ('Pa1', 'Pa', 'Ratios, rates, proportional relationships, and units'),
  ('Pa2', 'Pa', 'Percentages'),
  ('Pa3', 'Pa', 'One-variable data: distributions and measures of center and spread'),
  ('Pa4', 'Pa', 'Two-variable data: models and scatterplots'),
  ('Pa5', 'Pa', 'Probability and conditional probability'),
  ('Pa6', 'Pa', 'Inference from sample statistics and margin of error'),
  ('Pa7', 'Pa', 'Evaluating statistical claims: observational studies and experiments'),

  -- Additional Topics in Math
  ('Ad1', 'Ad', 'Area and volume'),
  ('Ad2', 'Ad', 'Lines, angles, and triangles'),
  ('Ad3', 'Ad', 'Right triangles and trigonometry'),
  ('Ad4', 'Ad', 'Circles');
