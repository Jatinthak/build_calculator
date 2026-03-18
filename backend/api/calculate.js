```javascript
/**
 * Handles the calculate API endpoint.
 * 
 * @module backend/api/calculate
 */

const express = require('express');
const router = express.Router();
const { validate } = require('joi');

/**
 * Validates the request body for the calculate API endpoint.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
function validateRequestBody(req, res, next) {
  const schema = {
    operation: Joi.string().required().valid('add', 'subtract', 'multiply', 'divide'),
    num1: Joi.number().required(),
    num2: Joi.number().required(),
  };

  const { error } = validate(req.body, schema);

  if (error) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  next();
}

/**
 * Calculates the result of the given arithmetic operation.
 * 
 * @param {string} operation - The arithmetic operation to perform.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The result of the operation.
 */
function calculate(operation, num1, num2) {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 === 0) {
        throw new Error('Cannot divide by zero');
      }
      return num1 / num2;
    default:
      throw new Error('Invalid operation');
  }
}

/**
 * Handles the calculate API endpoint.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
router.post('/api/calculate', validateRequestBody, (req, res) => {
  try {
    const { operation, num1, num2 } = req.body;
    const result = calculate(operation, num1, num2);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```