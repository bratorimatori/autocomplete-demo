import { Story } from '@storybook/react';
import { Meta } from '@storybook/react/types-6-0';
import { veggies } from './tests/mockedData';

import Autocomplete from './Autocomplete';

export default {
  title: 'Components/Autocomplete',
} as Meta;

export const Default: Story = () => {
  return (
    <Autocomplete
      label='Autocomplete Example'
      placeholder='Veggies'
      options={veggies}
    />
  );
};
