import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Autocomplete from '../Autocomplete';
import { veggies } from './mockedData';

describe('Autocomplete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const label = 'Autocomplete Example';

  it('renders correctly', () => {
    render(
      <Autocomplete label={label} placeholder='Veggies' options={veggies} />
    );

    expect(screen.getAllByLabelText(label)).toBeTruthy();
  });

  it('renders with the correct label', () => {
    render(
      <Autocomplete label={label} placeholder='Veggies' options={veggies} />
    );
    const linkElement = screen.getByText(/Autocomplete Example/i);
    expect(linkElement).toBeInTheDocument();
  });
});
