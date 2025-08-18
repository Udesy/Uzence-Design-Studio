
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ThemeToggle({ className, variant = 'ghost', size = 'icon' }: ThemeToggleProps) {
  const { theme, setTheme, actualTheme } = useTheme();

  const ThemeIcon = actualTheme === 'dark' ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn('transition-all duration-200', className)}
          aria-label="Toggle theme"
        >
          <ThemeIcon className="h-4 w-4 transition-all duration-200" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        side="bottom"
        sideOffset={12}
        alignOffset={-4}
        className="min-w-[140px]"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            'cursor-pointer flex items-center space-x-2',
            theme === 'light' && 'bg-accent text-accent-foreground'
          )}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            'cursor-pointer flex items-center space-x-2',
            theme === 'dark' && 'bg-accent text-accent-foreground'
          )}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(
            'cursor-pointer flex items-center space-x-2',
            theme === 'system' && 'bg-accent text-accent-foreground'
          )}
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === 'system' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple toggle button variant (no dropdown)
export function SimpleThemeToggle({ className }: { className?: string }) {
  const { actualTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn('transition-all duration-200', className)}
      aria-label={`Switch to ${actualTheme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {actualTheme === 'dark' ? (
        <Sun className="h-4 w-4 transition-all duration-200" />
      ) : (
        <Moon className="h-4 w-4 transition-all duration-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}