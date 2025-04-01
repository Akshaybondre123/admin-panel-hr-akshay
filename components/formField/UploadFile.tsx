import React from 'react';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';

interface UploadFileProps<T extends FieldValues> {
  name: FieldPath<T>; // Name of the field
  control: Control<T>; // Control object from react-hook-form
  label?: string; // Optional label for the input
  error?: string; // Error message to display
  requiredLabel?: boolean; // Optional flag to show required label
  accept?:string
}

const UploadFile = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  requiredLabel,
  accept
}: UploadFileProps<T>) => {
  return (
    <div>
      <div className="mb-3 font-medium text-[14px]">
        {label && <label htmlFor={name} className="font-motesserat">{label}</label>}
        {requiredLabel && <span className="text-red-500">*</span>}
      </div>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                id={name}
                type="file"
                className="hidden"
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file); // Pass the file to react-hook-form
                }}
              />
              <label
                htmlFor={name}
                className="w-full h-32 border border-gray-300 rounded-lg flex items-center justify-center text-sm text-gray-500 cursor-pointer"
              >
                Upload Profile Picture
              </label>
            </div>
          )}
        />
      </div>
      {/* Render error message inline */}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default UploadFile;