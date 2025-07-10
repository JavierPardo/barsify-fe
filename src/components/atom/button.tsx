interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  const baseStyles = 'font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out';
  const variantStyles = {
    primary: 'bg-red-500 hover:bg-red-600 text-white shadow-md',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-md',
  };
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};