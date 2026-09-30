import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, fullWidth = true, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-bold text-maroon-900 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full px-4 py-2.5 rounded-xl border transition-all duration-200',
            'bg-parchment-50 text-maroon-950 placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent',
            error ? 'border-red-400 focus:ring-red-500' : 'border-parchment-300',
            className,
          ].join(' ')}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-slate-500 mt-1">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-bold text-maroon-900 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={[
            'w-full px-4 py-2.5 rounded-xl border transition-all duration-200 resize-none',
            'bg-parchment-50 text-maroon-950 placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent',
            error ? 'border-red-400 focus:ring-red-500' : 'border-parchment-300',
            className,
          ].join(' ')}
          {...props}
        />
        {hint && !error && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';