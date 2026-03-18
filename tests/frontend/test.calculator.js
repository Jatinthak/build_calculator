```javascript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Calculator from '../components/Calculator';

const server = setupServer(
  rest.post(`${process.env.SUPABASE_URL}/api/calculate`, (req, res, ctx) => {
    const { operation, num1, num2 } = req.body;
    if (operation === 'add') {
      return res(ctx.json({ result: num1 + num2 }));
    } else if (operation === 'subtract') {
      return res(ctx.json({ result: num1 - num2 }));
    } else if (operation === 'multiply') {
      return res(ctx.json({ result: num1 * num2 }));
    } else if (operation === 'divide') {
      if (num2 === 0) {
        return res(ctx.status(400), ctx.json({ error: 'Cannot divide by zero' }));
      }
      return res(ctx.json({ result: num1 / num2 }));
    }
    return res(ctx.status(400), ctx.json({ error: 'Invalid operation' }));
  })
);

describe('Calculator component', () => {
  afterEach(() => server.resetHandlers());

  it('renders the calculator component', () => {
    const { getByText } = render(<Calculator />);
    expect(getByText('Calculator')).toBeInTheDocument();
  });

  it('performs addition', async () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.change(operationSelect, { target: { value: 'add' } });
    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Result: 15')).toBeInTheDocument());
  });

  it('performs subtraction', async () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.change(operationSelect, { target: { value: 'subtract' } });
    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Result: 5')).toBeInTheDocument());
  });

  it('performs multiplication', async () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.change(operationSelect, { target: { value: 'multiply' } });
    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Result: 50')).toBeInTheDocument());
  });

  it('performs division', async () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.change(operationSelect, { target: { value: 'divide' } });
    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Result: 2')).toBeInTheDocument());
  });

  it('handles division by zero', async () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '0' } });
    fireEvent.change(operationSelect, { target: { value: 'divide' } });
    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Error: Cannot divide by zero')).toBeInTheDocument());
  });

  it('handles invalid operation', async () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.change(operationSelect, { target: { value: 'invalid' } });
    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Error: Invalid operation')).toBeInTheDocument());
  });
});
```