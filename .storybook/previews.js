import '@storybook/addon-console';
import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withConsole, setConsoleOptions } from '@storybook/addon-console';
import { withPropsTable } from 'storybook-addon-react-docgen';

// Generate story info
addDecorator(withPropsTable({}));

// Enable HMR messages
setConsoleOptions({
  panelExclude: [],
});

// Add Accessibility testing on Storybook console
addDecorator(withA11y);

// Decorators are wrapper components or Storybook decorators that wrap a story
// Add a decorator globally for all stories
addDecorator((storyFn, context) => withConsole()(storyFn)(context));