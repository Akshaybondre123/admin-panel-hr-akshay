import React from "react"

interface InputFieldProps {
  name: string
  label?: string
  placeholder?: string
  type?: "number"|"text"|"email"|"password"|"search"
  error?: string
  children?: React.ReactNode
  requiredLabel?: boolean
  readonly?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const InputField = ({
  name,
  label,
  placeholder,
  type = 'text',
  error,
  children,
  requiredLabel,
  readonly,
  value,
  onChange,
  className = ""
}: InputFieldProps) => {
  return (
    <div>
      <div className='mb-3 font-medium text-[14px]'>
        {label && <label htmlFor={name} className='font-motesserat'>{label}</label>}
        {requiredLabel && <span className='text-red-500'>*</span>}
      </div>
      <div className='relative'>
        <input
          name={name}
          id={name}
          type={type}
          readOnly={readonly}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 ${className}`}
        />
        {children}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}

export default InputField