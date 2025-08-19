import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Badge } from '../components/ui/badge';

const meta = {
  title: 'UI Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile badge component with multiple variants and hover animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
      description: 'The visual variant of the badge',
    },
    children: {
      control: 'text',
      description: 'The content of the badge',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants with hover animations.',
      },
    },
  },
};

// Status badges example
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">User Status:</span>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Payment:</span>
        <Badge variant="warning">Pending</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Account:</span>
        <Badge variant="destructive">Suspended</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Subscription:</span>
        <Badge variant="default">Premium</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example usage of badges for status indicators.',
      },
    },
  },
};
