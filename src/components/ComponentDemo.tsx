import { useState } from 'react';
import InputField from '../components/ui/InputField';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ThemeToggle } from '../components/ui/theme-toggle';
import { useTheme } from '../hooks/use-theme';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Manager',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
  {
    id: 4,
    name: 'Alice Wilson',
    email: 'alice.wilson@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-16',
  },
];

export function ComponentDemo() {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { actualTheme } = useTheme();

  const columns: Column<User>[] = [
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
      render: (value: string) => (
        <Badge variant={value === 'Admin' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      render: (value: 'active' | 'inactive') => (
        <Badge variant={value === 'active' ? 'default' : 'destructive'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      dataIndex: 'lastLogin',
      sortable: true,
    },
  ];

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-8">
      {/* Header with Theme Toggle */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold text-foreground">UI Component Library</h1>
          <p className="text-xl text-muted-foreground">Professional React components with TypeScript</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Badge variant="outline" className="capitalize">
              {actualTheme} theme
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>

      {/* InputField Demo */}
      <Card>
        <CardHeader>
          <CardTitle>InputField Component</CardTitle>
          <CardDescription>
            A flexible input component with multiple variants, states, and features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Variants</h3>
              
              <InputField
                label="Outlined (Default)"
                placeholder="Enter text..."
                variant="outlined"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                showClearButton
                onClear={() => setInputValue('')}
              />
              
              <InputField
                label="Filled Variant"
                placeholder="Enter text..."
                variant="filled"
                helperText="This is a filled input variant"
              />
              
              <InputField
                label="Ghost Variant"
                placeholder="Enter text..."
                variant="ghost"
                helperText="This is a ghost input variant"
              />
            </div>

            {/* States and Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">States & Features</h3>
              
              <InputField
                label="Password Input"
                placeholder="Enter password..."
                isPassword
                value={passwordValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordValue(e.target.value)}
                showClearButton
                onClear={() => setPasswordValue('')}
              />
              
              <InputField
                label="Loading State"
                placeholder="Loading..."
                loading
                helperText="Input with loading spinner"
              />
              
              <InputField
                label="Error State"
                placeholder="Enter valid email..."
                invalid
                errorMessage="Please enter a valid email address"
              />
              
              <InputField
                label="Disabled State"
                placeholder="Disabled input..."
                disabled
                helperText="This input is disabled"
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Small"
                placeholder="Small input..."
                size="sm"
              />
              <InputField
                label="Medium (Default)"
                placeholder="Medium input..."
                size="md"
              />
              <InputField
                label="Large"
                placeholder="Large input..."
                size="lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DataTable Demo */}
      <Card>
        <CardHeader>
          <CardTitle>DataTable Component</CardTitle>
          <CardDescription>
            A feature-rich data table with sorting, selection, and customizable columns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleLoadingDemo} variant="outline">
              Toggle Loading Demo
            </Button>
            {selectedUsers.length > 0 && (
              <Badge variant="outline">
                {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
              </Badge>
            )}
          </div>
          
          <DataTable
            data={sampleData}
            columns={columns}
            loading={loading}
            selectable
            onRowSelect={setSelectedUsers}
            rowKey="id"
            size="md"
          />
          
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Selected Users:</h4>
              <ul className="text-sm text-muted-foreground">
                {selectedUsers.map((user) => (
                  <li key={user.id}>
                    {user.name} ({user.email})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}