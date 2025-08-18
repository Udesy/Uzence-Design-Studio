import React, { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  rowKey?: keyof T | ((record: T) => string | number);
  emptyText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  key: string | null;
  direction: SortDirection;
}

function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey = 'id' as keyof T,
  emptyText = "No data available",
  className,
  size = 'md',
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortState, setSortState] = useState<SortState>({ key: null, direction: null });

  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] as string | number || index;
  };

  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.key);
    if (!column || !column.sortable) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      else if (aValue < bValue) comparison = -1;

      return sortState.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortState, columns]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prevState => {
      if (prevState.key === column.key) {
        if (prevState.direction === 'asc') {
          return { key: column.key, direction: 'desc' };
        } else if (prevState.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      return { key: column.key, direction: 'asc' };
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(sortedData.map((record, index) => getRowKey(record, index)));
      setSelectedRows(allKeys);
      onRowSelect?.(sortedData);
    } else {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    }
  };

  const handleRowSelect = (record: T, index: number, checked: boolean) => {
    const key = getRowKey(record, index);
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(key);
    } else {
      newSelectedRows.delete(key);
    }

    setSelectedRows(newSelectedRows);
    
    const selectedData = sortedData.filter((item, idx) => 
      newSelectedRows.has(getRowKey(item, idx))
    );
    onRowSelect?.(selectedData);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          table: 'text-xs',
          cell: 'px-3 py-2',
          header: 'px-3 py-2',
        };
      case 'lg':
        return {
          table: 'text-base',
          cell: 'px-6 py-4',
          header: 'px-6 py-4',
        };
      default:
        return {
          table: 'text-sm',
          cell: 'px-4 py-3',
          header: 'px-4 py-3',
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const isAllSelected = sortedData.length > 0 && selectedRows.size === sortedData.length;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sortedData.length;

  return (
    <div className={cn("relative w-full overflow-auto", className)}>
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}
      
      <table className={cn("w-full caption-bottom border-collapse", sizeClasses.table)}>
        <thead className="bg-table-header">
          <tr className="border-b border-table-border">
            {selectable && (
              <th className={cn("text-left font-medium text-muted-foreground", sizeClasses.header)}>
                <div className="relative">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                  {isIndeterminate && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2 h-2 bg-primary rounded-sm" />
                    </div>
                  )}
                </div>
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "text-left font-medium text-muted-foreground",
                  sizeClasses.header,
                  column.sortable && "cursor-pointer hover:text-foreground transition-colors select-none",
                  column.align === 'center' && "text-center",
                  column.align === 'right' && "text-right"
                )}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.title}</span>
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={cn(
                          "h-3 w-3 -mb-1",
                          sortState.key === column.key && sortState.direction === 'asc'
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "h-3 w-3",
                          sortState.key === column.key && sortState.direction === 'desc'
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        )}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className={cn(
                  "text-center text-muted-foreground py-12",
                  sizeClasses.cell
                )}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((record, index) => {
              const key = getRowKey(record, index);
              const isSelected = selectedRows.has(key);
              
              return (
                <tr
                  key={key}
                  className={cn(
                    "border-b border-table-border hover:bg-table-row-hover transition-colors",
                    isSelected && "bg-primary/5"
                  )}
                >
                  {selectable && (
                    <td className={cn("align-top", sizeClasses.cell)}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleRowSelect(record, index, !!checked)}
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = record[column.dataIndex];
                    const content = column.render ? column.render(value, record, index) : String(value ?? '');
                    
                    return (
                      <td
                        key={column.key}
                        className={cn(
                          "align-top",
                          sizeClasses.cell,
                          column.align === 'center' && "text-center",
                          column.align === 'right' && "text-right"
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export { DataTable };