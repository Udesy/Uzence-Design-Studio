import React, { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';

const inputFieldVariants = cva(
    "flex h-10 w-full rounded-md px-3 py-2 text-sm text-foreground transition-all duration-300 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:scale-[1.02] focus:shadow-md",
    {
      variants: {
        variant: {
          filled: "bg-muted border border-transparent hover:bg-muted/80 hover:shadow-sm focus-visible:bg-background focus-visible:border-primary focus-visible:ring-primary/20",
          outlined: "border border-border bg-background hover:border-primary/50 hover:shadow-sm focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:shadow-lg",
          ghost: "border-0 bg-transparent hover:bg-muted/50 hover:shadow-sm focus-visible:bg-muted focus-visible:ring-primary/20",
        },
        size: {
          sm: "h-8 px-2 py-1 text-xs rounded-sm",
          md: "h-10 px-3 py-2 text-sm",
          lg: "h-12 px-4 py-3 text-base rounded-lg",
        },
        invalid: {
          true: "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20 hover:border-red-400",
          false: "",
        },
      },
      defaultVariants: {
        variant: "outlined",
        size: "md",
        invalid: false,
      },
    }
  );

  const labelVariants = cva(
    "text-sm font-medium leading-none transition-colors",
    {
      variants: {
        invalid: {
          true: "text-foreground",
          false: "text-foreground",
        },
        disabled: {
          true: "text-muted-foreground",
          false: "",
        },
      },
      defaultVariants: {
        invalid: false,
        disabled: false,
      },
    }
  );

  const helperTextVariants = cva(
    "text-xs mt-1 transition-colors",
    {
      variants: {
        invalid: {
          true: "text-red-500",
          false: "text-muted-foreground",
        },
      },
      defaultVariants: {
        invalid: false,
      },
    }
  );

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputFieldVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  loading?: boolean;
  showClearButton?: boolean;
  isPassword?: boolean;
  onClear?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    helperText,
    errorMessage,
    invalid,
    loading,
    showClearButton,
    isPassword,
    onClear,
    onChange,
    value,
    className,
    variant,
    size,
    disabled,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");
    const actualValue = value !== undefined ? value : internalValue;
    const isInvalid = invalid || !!errorMessage;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(value === undefined) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    const handleClear = () => {
        if(value === undefined) {
            setInternalValue('');
        }
        onClear?.();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type;

  return (
    <div className="w-full">
      {label && (
        <label 
            className={cn(labelVariants({invalid: isInvalid, disabled}))}
            htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <div className="relative mt-1">
                <input
          {...props}
          type={inputType}
          className={cn(
            inputFieldVariants({variant, size, invalid: isInvalid}),
            (showClearButton && actualValue) || loading ? "pr-10" : "",
            isPassword ? "pr-10" : "",
            (isPassword && ((showClearButton && actualValue) || loading)) ? "pr-16" : "",
            className
          )}
          value={actualValue}
          onChange={handleChange}
          disabled={disabled || loading}
          aria-invalid={isInvalid}
          aria-describedby={
            errorMessage || helperText ? `${props.id}-description` : undefined
           }
        />

        {loading && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
            </div>
        )}

        {!loading && showClearButton && actualValue && (
            <button
                type='button'
                onClick={handleClear}
                className={cn(
                    "absolute top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                    isPassword ? "right-10" : "right-2"
                )}
                aria-label='clear input'
                >
                    <X className='h-4 w-4' />
                </button>
        )}

        {/* Password visibility toggle button */}
        {isPassword && !loading && (
            <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-medium-foreground hover:text-foreground transition-colors'
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                >
                    {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </button>
        )}
        </div>
       
       {/* Helper text or error message */}
       {(errorMessage ||  helperText) && (
        <p 
            id={`${props.id}-description`}
            className={cn(helperTextVariants({ invalid: isInvalid }))}
        >
            {errorMessage || helperText}
        </p>
       )}
       </div>
  );
}

InputField.displayName = 'InputField'

export default InputField