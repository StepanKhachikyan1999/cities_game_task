import React, { ButtonHTMLAttributes } from 'react'
const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', children, ...rest }) => {
    const combinedClassName = `bg-violet-600 text-white px-2.5 py-1.5 rounded-md ${className}`;

    return (
        <button className={combinedClassName} {...rest}>
            {children}
        </button>
    );
};

export default Button

