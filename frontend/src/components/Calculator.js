```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Calculator component.
 * @returns {JSX.Element} The calculator component.
 */
function Calculator() {
  const [operation, setOperation] = useState('');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the calculation.
   * @param {Event} event The form submission event.
   */
  const handleCalculate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_SUPABASE_URL}/api/calculate`, {
        operation,
        num1,
        num2,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
        },
      });

      setResult(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the operation change.
   * @param {Event} event The operation change event.
   */
  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  /**
   * Handles the number 1 change.
   * @param {Event} event The number 1 change event.
   */
  const handleNum1Change = (event) => {
    setNum1(parseFloat(event.target.value));
  };

  /**
   * Handles the number 2 change.
   * @param {Event} event The number 2 change event.
   */
  const handleNum2Change = (event) => {
    setNum2(parseFloat(event.target.value));
  };

  return (
    <div>
      <h1>Calculator</h1>
      <form onSubmit={handleCalculate}>
        <label>
          Operation:
          <select value={operation} onChange={handleOperationChange}>
            <option value="">Select an operation</option>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </label>
        <br />
        <label>
          Number 1:
          <input type="number" value={num1} onChange={handleNum1Change} />
        </label>
        <br />
        <label>
          Number 2:
          <input type="number" value={num2} onChange={handleNum2Change} />
        </label>
        <br />
        <button type="submit" disabled={loading}>Calculate</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : result !== 0 ? (
        <p>Result: {result}</p>
      ) : (
        <p>Please select an operation and enter two numbers.</p>
      )}
    </div>
  );
}

export default Calculator;
```