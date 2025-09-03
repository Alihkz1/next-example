"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => (
  <button
    {...props}
    disabled={loading || props.disabled}
    className="w-full rounded-lg bg-primary text-white py-2 font-medium disabled:opacity-50 transition-transform duration-1000 ease-in-out hover:scale-x-105"
  >
    {loading ? "کمی صبر کنید..." : children}
  </button>
);

export default Button;
