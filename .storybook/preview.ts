import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'hsl(0 0% 100%)',
        },
        {
          name: 'dark',
          value: 'hsl(215 28% 17%)',
        },
      ],
    },
    a11y: {
      test: 'todo'
    },
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      const { backgrounds } = context.globals;
      const isDark = backgrounds?.value === 'hsl(215 28% 17%)';
      
      return (
        <div className={`min-h-screen p-4 ${isDark ? 'dark' : ''}`}>
          <div className="bg-background text-foreground min-h-full">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;