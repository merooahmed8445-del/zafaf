import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-maroon-900 text-white hover:bg-maroon-800 active:bg-maroon-950 shadow-md',
  secondary: 'bg-parchment-200 text-maroon-900 hover:bg-parchment-300',
  gold: 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 hover:brightness-105 shadow-lg',
  outline: 'border-2 border-maroon-900 text-maroon-900 hover:bg-maroon-900 hover:text-white',
  ghost: 'text-maroon-900 hover:bg-maroon-50',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-7 py-3.5 text-lg rounded-xl',
};

function getClasses(variant: ButtonVariant, size: ButtonSize, fullWidth: boolean, className: string) {
  return [
    'inline-flex items-center justify-center gap-2 font-bold transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, loading = false, children, className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={getClasses(variant, size, fullWidth, className)}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export function ButtonLink({ href, external, variant = 'primary', size = 'md', fullWidth = false, children, className = '' }: LinkProps) {
  const classes = getClasses(variant, size, fullWidth, className);
  
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}