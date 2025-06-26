import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean; // Allow options to be individually disabled
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  containerClassName?: string;
  placeholder?: string; // Explicitly define placeholder prop
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  id, 
  options, 
  error, 
  className = '', 
  containerClassName = '', 
  placeholder, // Destructure placeholder
  ...props // props contains 'value', 'onChange', 'required', etc.
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
      <select
        id={id}
        className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-100 
                    ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props} 
      >
        {placeholder && (
          // This option will be selected if props.value is "" or undefined.
          // It is disabled if the select itself is marked 'required' AND 
          // its current value is empty (props.value is "" or undefined).
          // This forces the user to select a valid option if the field is required.
          <option 
            value="" 
            disabled={props.required && (props.value === "" || typeof props.value === 'undefined')}
            // Hidden is not strictly necessary as browser usually handles it, but can be added for explicit control
            // hidden={!!props.value && props.value !== ""} 
          >
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Select;