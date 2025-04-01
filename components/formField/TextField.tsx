import React from "react";
import { Controller, Control } from "react-hook-form";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  control: Control<any>;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  rows = 4,
  error,
  control
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name} className="text-sm font-medium text-black">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            className="border-1 border-[#0000001F] rounded-[8px] p-2"
            rows={rows}
            placeholder={placeholder}
          />
        )}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default TextField;