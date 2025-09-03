"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <label className="block w-full">
      <span className="text-sm font-medium ps-2">{label}:</span>
      <input
        {...props}
        className={`mt-2 block w-full rounded-lg border p-2 outline-none 
          transition duration-400 ease-in-out text-sm
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-xs mt-1 ps-1 text-red-500">{error}</p>}
    </label>
  );
};

export default Input;
