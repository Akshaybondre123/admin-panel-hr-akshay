import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';

interface DatePickerProps<T extends FieldValues> {
  name: FieldPath<T>; // Name of the field
  control: Control<T>; // Control object from react-hook-form
  label?: string; // Optional label for the date picker
  placeholder?: string; // Optional placeholder
  error?: string; // Error message to display
  requiredLabel?: boolean; // Optional flag to show required label
  readonly?: boolean; // Optional flag to make date picker readonly
  min?:string;
  max?:string;
}

const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  requiredLabel,
  readonly,
  min,
  max
}: DatePickerProps<T>) => {
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
            <input
              {...field}
              type="date"
              readOnly={readonly}
              min={min}
              max={max}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
            />
          )}
        />
      </div>
      {/* Render error message inline */}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default DatePicker;