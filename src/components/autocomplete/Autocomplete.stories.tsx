import { Story, Meta } from '@storybook/react';
import { veggies } from './tests/mockedData';

import Autocomplete from './Autocomplete';

export default {
  title: 'Components/Autocomplete',
} as Meta;

export const Default: Story = () => {
  return (
    <Autocomplete
      label='Autocomplete search label'
      placeholder='Veggies'
      options={veggies}
    />
  );
};
