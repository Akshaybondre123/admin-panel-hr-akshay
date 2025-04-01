import React from 'react';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  name: FieldPath<T>; // Name of the field
  control: Control<T>; // Control object from react-hook-form
  label?: string; // Optional label for the input
  placeholder?: string; // Optional placeholder
  type?: "number"|"text"|"email"|"password"; // Input type (e.g., 'text', 'password', 'email')
  error?: string; // Error message to display
  children?: React.ReactNode; // Allow multiple children
  requiredLabel?: boolean; // Optional flag to show required label
  readonly?: boolean; // Optional flag to make input readonly
  defaultValue?: string; // Optional default value for the input
}

const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  error,
  children,
  requiredLabel,
  readonly,
  defaultValue="",
}: InputFieldProps<T>) => {
  return (
    <div >
      <div className='mb-3 font-medium text-[14px]'>
        {label && <label htmlFor={name} className='font-motesserat'>{label}</label>}
        {requiredLabel && <span className='text-red-500'>*</span>}
      </div>
      <div className='relative'>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
             defaultValue={defaultValue}
              {...field}
              // id={name}
              type={type}
              readOnly={readonly}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
            />
          )}
        />
        {/* Render children */}
        {children}
      </div>
      {/* Render error message inline */}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default InputField;