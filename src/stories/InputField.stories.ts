import type { Meta, StoryObj } from '@storybook/react';
import InputField from '../components/ui/InputField';

const meta = {
  title: 'UI Components/InputField',
  component: InputField,
  parameters: {
    docs: {
      description: {
        component: 'A highly customizable input field component with support for labels, validation, password toggle, clear button, and loading states. Built with TypeScript and Tailwind CSS.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input field',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input is in an invalid state',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the input is in a loading state',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show a clear button when input has value',
    },
    isPassword: {
      control: 'boolean',
      description: 'Whether this is a password input with show/hide toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    label: {
      control: 'text',
      description: 'Optional label text displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    helperText: {
      control: 'text',
      description: 'Optional helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Optional error message displayed below the input',
    },
  },
  args: {
    onChange: () => {},
    onClear: () => {},
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be at least 3 characters long',
  },
};

// Variants
export const Filled: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'Type something...',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Input',
    placeholder: 'Type something...',
    variant: 'outlined',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost Input',
    placeholder: 'Type something...',
    variant: 'ghost',
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

// States
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    errorMessage: 'Please enter a valid email address',
    invalid: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

// Special Features
export const WithClearButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for something...',
    showClearButton: true,
    value: 'Sample text to clear',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    isPassword: true,
    value: 'secretpassword',
  },
};

export const PasswordWithClear: Story = {
  args: {
    label: 'Password with Clear',
    placeholder: 'Enter your password',
    isPassword: true,
    showClearButton: true,
    value: 'secretpassword',
  },
};

// Complex Examples
export const FormExample: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    helperText: 'Enter your first and last name',
    variant: 'outlined',
    size: 'md',
    showClearButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete form input example with label, helper text, and clear functionality.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'user@example.com',
    errorMessage: 'This email address is already taken',
    invalid: true,
    variant: 'outlined',
    value: 'invalid@email',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field showing error state with validation message.',
      },
    },
  },
};
