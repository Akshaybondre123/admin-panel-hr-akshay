import React from "react";
import { Control, Controller } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface RadioButtonProps {
  control: Control<any>;
  name: string;
  options: Option[];
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  error?: string; 
}

const RadioButton: React.FC<RadioButtonProps> = ({
  control,
  name,
  options,
  defaultValue,
  error,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="flex items-center space-x-4">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                {...field}
                value={option.value}
                checked={field.value === option.value}
                onChange={() => field.onChange(option.value)}
                className="peer accent-black"
                disabled={rest.disabled}
                defaultChecked={defaultValue === option.value}
                defaultValue={defaultValue}
              />
              <span
                className={`text-sm transition-all duration-200 ${
                  field.value === option.value
                    ? "font-semibold text-black"
                    : "text-gray-400"
                }`}
              >
                {option.label}
              </span>
            </label>
          ))}

          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
      )}
    />
  );
};

export default RadioButton;