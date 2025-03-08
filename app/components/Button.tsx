import React from 'react';
import cn from 'classnames';

// Define types for button props
type ButtonVariant = 'default' | 'red' | 'black' | 'bigRed';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  uppercase?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  uppercase = false,
  className = '',
  ...props
}) => {
  // Base styles to match your custom CSS
  const baseStyles = "flex items-center justify-center font-semibold rounded-2xl border-transparent transition-all duration-250 ease-in-out";
  
  // Styles that vary based on variant
  const variantStyles = {
    default: "bg-[#dc3c2e] text-[#fff6eb] hover:bg-[#140a02] text-xl h-24",
    red: "bg-[#dc3c2e] text-[#fff6eb] hover:bg-[#fff6eb] hover:text-[#dc3c2e] hover:border hover:border-[#dc3c2e] text-xl h-24",
    black: "bg-[#140a02] text-[#fff6eb] hover:bg-[#fff6eb] hover:text-[#140a02] hover:shadow-md text-xl h-24",
    bigRed: "bg-[#dc3c2e] text-[#fff6eb] w-full h-40 text-2xl border-0 hover:bg-[#fff6eb] hover:text-[#dc3c2e] hover:border hover:border-[#dc3c2e] disabled:bg-[#140a02] disabled:hover:text-[#fff6eb] disabled:hover:bg-[#140a02]"
  };

  // Optional text transform
  const textStyles = uppercase ? "uppercase" : "";

  return (
    <button
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