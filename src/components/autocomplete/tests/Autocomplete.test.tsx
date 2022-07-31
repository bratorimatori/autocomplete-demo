import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import Autocomplete from '../Autocomplete';
import { veggies } from './mockedData';

// TODO Add missing tests...
describe('Autocomplete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(
      <Autocomplete
        label='Autocomplete Example'
        placeholder='Veggies'
        options={veggies}
      />
    );
    const input = screen.getByLabelText('Autocomplete Example');
    return {
      input,
    };
  };

  it('renders with the correct label', () => {
    const { input } = setup();

    expect(input).toBeInTheDocument();
  });

  it('renders with correct value in input', () => {
    const { input } = setup();
    userEvent.type(input, 'onion');

    expect(input).toHaveValue('onion');
  });

  it('select the right value with keyboard', async () => {
    const { input } = setup();

    input.focus();
    fireEvent.change(input, { target: { value: 'o' } });
    await wait();
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    await wait();
    fireEvent.keyDown(input, { key: 'Enter' });
    await wait();
    expect(input).toHaveValue('Broccoli');
  });
});
