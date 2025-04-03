import Input from '@/components/shared/input';
import { render, screen } from '@testing-library/react';


test('renders input field with the correct value', () => {
  const mockChangeHandler = jest.fn();
  const value = 'Test value';

  render(
    <Input
      onInputChange={mockChangeHandler}
      value={value}
      labelText="Test Label"
    />
  );

  const inputElement = screen.getByLabelText('Test Label');
  expect(inputElement).toHaveValue(value);
});

test('renders input field with placeholder text', () => {
      const mockChangeHandler = jest.fn();
      const placeholder = 'Enter text here';
    
      render(
        <Input
          onInputChange={mockChangeHandler}
          placeholder={placeholder}
          labelText="Test Label"
        />
      );
    
      const inputElement = screen.getByLabelText('Test Label');
      expect(inputElement).toHaveAttribute('placeholder', placeholder);
    });

    test('renders input field as disabled', () => {
      const mockChangeHandler = jest.fn();
      const disabled = true;
    
      render(
        <Input
          onInputChange={mockChangeHandler}
          disabled={disabled}
          labelText="Test Label"
        />
      );
    
      const inputElement = screen.getByLabelText('Test Label');
      expect(inputElement).toBeDisabled();
    });
