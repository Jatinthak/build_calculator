```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/Calculator';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

/**
 * Initialize the Supabase client.
 * @returns {Object} The Supabase client instance.
 */
function initSupabase() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and key are required');
  }
  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Perform a calculation using the Supabase API.
 * @param {string} operation The arithmetic operation to perform.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {Promise<number>} The result of the calculation.
 */
async function calculate(operation, num1, num2) {
  try {
    const supabase = initSupabase();
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation,
        num1,
        num2,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    throw new Error(`Error performing calculation: ${error.message}`);
  }
}

/**
 * Render the Calculator component.
 */
function App() {
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleCalculate = async (operation, num1, num2) => {
    setLoading(true);
    setError(null);
    try {
      const result = await calculate(operation, num1, num2);
      setResult(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Calculator
        onCalculate={handleCalculate}
        result={result}
        error={error}
        loading={loading}
      />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```