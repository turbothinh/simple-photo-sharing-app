import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { jsxDecorator } from 'storybook-addon-jsx';
import { Button, ButtonText, ButtonRow } from './Button';

storiesOf('Button', module)
  .addDecorator(jsxDecorator)
  .add('All', () => (
    <ButtonRow>
      <Button onPress={action('Button clicked')}>
        <ButtonText>Click me</ButtonText>
      </Button>
    </ButtonRow>
));
