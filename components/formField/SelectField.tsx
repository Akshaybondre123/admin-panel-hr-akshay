import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface IProps {
  control: Control<FieldValues|any> ;
  name: string;
  options: Option[];
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  requiredLabel?: boolean;
  error?: string;
  label?: string;
}

const SelectField: React.FC<IProps> = ({
  requiredLabel,
  error,
  label,
  control,
  name,
  options,
  defaultValue,
  className,
  ...rest
}) => {
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
              {" "}
              <option value="Select" defaultValue="Select" disabled selected>
                Select
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
      {/* Render error message inline */}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default SelectField;