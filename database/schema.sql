```sql
-- Create a table to store calculation history
CREATE TABLE IF NOT EXISTS calculation_history (
  id SERIAL PRIMARY KEY,
  operation VARCHAR(10) NOT NULL,
  num1 DECIMAL(10, 2) NOT NULL,
  num2 DECIMAL(10, 2) NOT NULL,
  result DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on the operation column for faster querying
CREATE INDEX IF NOT EXISTS idx_operation ON calculation_history (operation);

-- Create a function to perform basic arithmetic operations
CREATE OR REPLACE FUNCTION perform_calculation(
  _operation VARCHAR(10),
  _num1 DECIMAL(10, 2),
  _num2 DECIMAL(10, 2)
)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
  result DECIMAL(10, 2);
BEGIN
  IF _operation = 'add' THEN
    result := _num1 + _num2;
  ELSIF _operation = 'subtract' THEN
    result := _num1 - _num2;
  ELSIF _operation = 'multiply' THEN
    result := _num1 * _num2;
  ELSIF _operation = 'divide' THEN
    IF _num2 = 0 THEN
      RAISE EXCEPTION 'Cannot divide by zero';
    END IF;
    result := _num1 / _num2;
  ELSE
    RAISE EXCEPTION 'Invalid operation';
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger function to insert calculation history
CREATE OR REPLACE FUNCTION insert_calculation_history()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO calculation_history (operation, num1, num2, result)
  VALUES (NEW.operation, NEW.num1, NEW.num2, NEW.result);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a table to store calculation requests
CREATE TABLE IF NOT EXISTS calculation_requests (
  id SERIAL PRIMARY KEY,
  operation VARCHAR(10) NOT NULL,
  num1 DECIMAL(10, 2) NOT NULL,
  num2 DECIMAL(10, 2) NOT NULL,
  result DECIMAL(10, 2) NOT NULL
);

-- Create a trigger to insert calculation history after inserting a calculation request
CREATE TRIGGER insert_calculation_history_trigger
AFTER INSERT ON calculation_requests
FOR EACH ROW
EXECUTE PROCEDURE insert_calculation_history();
```