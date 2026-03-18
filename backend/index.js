```javascript
/**
 * Backend application entry point.
 * 
 * This module sets up the Express.js server and defines the API endpoint for the calculator application.
 * 
 * @module backend/index
 */

const express = require('express');
const app = express();
const supabase = require('@supabase/supabase-js');
const rateLimit = require('express-rate-limit');
const { validate } = require('joi');

// Set up Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Set up rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting middleware to all routes
app.use(limiter);

// Set up JSON body parser middleware
app.use(express.json());

/**
 * API endpoint to perform basic arithmetic operations.
 * 
 * @async
 * @function calculate
 * @param {Object} req - Express.js request object
 * @param {Object} res - Express.js response object
 * @returns {Promise<void>}
 */
async function calculate(req, res) {
  try {
    // Validate request body
    const schema = {
      operation: ['addition', 'subtraction', 'multiplication', 'division'],
      num1: 'number',
      num2: 'number'
    };
    const { error } = validate(req.body, schema);
    if (error) {
      res.status(400).send({ error: 'Invalid request body' });
      return;
    }

    // Perform arithmetic operation
    const { operation, num1, num2 } = req.body;
    let result;
    switch (operation) {
      case 'addition':
        result = num1 + num2;
        break;
      case 'subtraction':
        result = num1 - num2;
        break;
      case 'multiplication':
        result = num1 * num2;
        break;
      case 'division':
        if (num2 === 0) {
          res.status(400).send({ error: 'Cannot divide by zero' });
          return;
        }
        result = num1 / num2;
        break;
      default:
        res.status(400).send({ error: 'Invalid operation' });
        return;
    }

    // Send response
    res.send({ result });
  } catch (error) {
    // Log error and send internal server error response
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
}

// Define API endpoint
app.post('/api/calculate', calculate);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```