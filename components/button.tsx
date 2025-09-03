"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading,
  fullWidth,
  children,
  ...props
}) => (
  <button
    {...props}
    disabled={loading || props.disabled}
    className={`${
      fullWidth ? "w-full" : ""
    } rounded-xl bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 disabled:opacity-50`}
  >
    {loading ? "Loading..." : children}
  </button>
);

export default Button;
