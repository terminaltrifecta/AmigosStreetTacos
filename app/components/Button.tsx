import React from 'react';
import cn from 'classnames';

// Define types for button props
type ButtonVariant = 'default' | 'red' | 'black' | 'bigRed';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant;
  uppercase?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled=false,
  variant = 'default',
  uppercase = true,
  className = '',
  ...props
}) => {
  // Base styles to match your custom CSS
  const baseStyles = "h-full uppercase min-w-20 flex items-center justify-center font-semibold rounded-2xl transition hover:shadow-md";
  
  // Styles that vary based on variant
  const variantStyles = {
    default: "bg-amigosred text-amigoswhite hover:bg-amigosblack text-xl",
    red: "bg-amigosred text-amigoswhite hover:bg-amigoswhite hover:text-amigosred text-xl",
    black: "bg-amigosblack text-amigoswhite hover:bg-amigoswhite hover:text-amigosblack text-xl",
    bigRed: "bg-amigosred text-amigoswhite w-full text-2xl hover:bg-amigoswhite hover:text-amigosred disabled:bg-amigosblack disabled:hover:text-amigoswhite disabled:hover:bg-amigosblack"
  };

  // Optional text transform
  const textStyles = uppercase ? "uppercase" : "";

  return (
    <button
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        textStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;