import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';

// Sample data for stories
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    createdAt: '2024-01-16',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Editor',
    status: 'inactive',
    createdAt: '2024-01-17',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'active',
    createdAt: '2024-01-18',
  },
];

const basicColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
];

const advancedColumns: Column<User>[] = [
  ...basicColumns,
  {
    key: 'createdAt',
    title: 'Created',
    dataIndex: 'createdAt',
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'id',
    align: 'right',
    render: () => (
      <div className="flex gap-2">
        <button className="text-blue-600 hover:text-blue-800 text-sm">
          Edit
        </button>
        <button className="text-red-600 hover:text-red-800 text-sm">
          Delete
        </button>
      </div>
    ),
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'UI Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: 'A feature-rich data table component with sorting, selection, loading states, and custom rendering. Built with TypeScript for type safety.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the table is in a loading state',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether rows can be selected',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the table',
    },
    emptyText: {
      control: 'text',
      description: 'Text to display when there is no data',
    },
  },
  args: {
    onRowSelect: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns as any,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns as any,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Data table with row selection functionality. Click checkboxes to select rows.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns as any,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Data table in loading state with spinner overlay.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns as any,
    emptyText: 'No users found',
  },
  parameters: {
    docs: {
      description: {
        story: 'Data table with no data, showing empty state message.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns as any,
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact data table with smaller padding and text.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns as any,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spacious data table with larger padding and text.',
      },
    },
  },
};

export const AdvancedExample: Story = {
  args: {
    data: sampleUsers,
    columns: advancedColumns as any,
    selectable: true,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced data table example with custom renderers, actions, and selection.',
      },
    },
  },
};

export const CustomRendering: Story = {
  args: {
    data: sampleUsers,
    columns: [
      {
        key: 'user',
        title: 'User',
        dataIndex: 'name' as any,
        render: (name: string, record: any) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {name.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-sm text-gray-500">{record.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'role',
        title: 'Role',
        dataIndex: 'role' as any,
        render: (role: string) => (
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            {role}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        dataIndex: 'status' as any,
        render: (status: string) => (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                status === 'active' ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="capitalize">{status}</span>
          </div>
        ),
      },
    ] as any,
  },
  parameters: {
    docs: {
      description: {
        story: 'Data table with heavily customized cell rendering including avatars and status indicators.',
      },
    },
  },
};
