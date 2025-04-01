import React from "react";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  options: Option[];
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  requiredLabel?: boolean;
  error?: string;
  label?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void; // Add this for standalone usage
}

const SelectField = <T extends FieldValues>({
  requiredLabel,
  error,
  label,
  control,
  name,
  options,
  defaultValue = "",
  className = "",
  placeholder = "Select",
  onValueChange,
  ...rest
}: SelectFieldProps<T>) => {
  // If control is not provided, create a local state version
  if (!control) {
    const [value, setValue] = React.useState(defaultValue);

    return (
      <div>
        <div className="mb-3 font-medium text-[14px]">
          {label && (
            <label htmlFor={name} className="font-motesserat">
              {label}
            </label>
          )}
          {requiredLabel && <span className="text-red-500">*</span>}
        </div>
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onValueChange?.(e.target.value);
            }}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${className} ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }`}
            disabled={rest.disabled}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 font-medium text-[14px]">
        {label && (
          <label htmlFor={name} className="font-motesserat">
            {label}
          </label>
        )}
        {requiredLabel && <span className="text-red-500">*</span>}
      </div>
      <div className="relative">
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <select
              {...field}
              {...rest}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${className} ${
                error
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : ""
              }`}
              disabled={rest.disabled}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default SelectField;