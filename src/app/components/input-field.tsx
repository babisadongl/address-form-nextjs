import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  errors: { valid: boolean; message: string };
  onBlur: () => void;
  isSelect?: boolean;
  options?: { label: string, value: string }[];
}

const InputField = ({ label, id, value, onChange, errors, onBlur, isSelect, options }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">{label}</label>
      {isSelect ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 ${!errors.valid ? 'border-red-500' : ''}`}
        >
          <option value="">Select State</option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 ${!errors.valid ? 'border-red-500' : ''}`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
      {!errors.valid && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
    </div>
  );
};

export default InputField;
