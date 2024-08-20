import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

interface TextFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;
  tooltip?: string;
  helpText?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
  max,
  tooltip,
  helpText,
}) => (
  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 focus-within:border-blue-500 transition duration-150 ease-in-out">
    <LabelWithTooltip label={label} tooltip={tooltip} />
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-none focus:ring-0 text-lg px-2 py-1"
      placeholder={placeholder}
      min={min}
      max={max}
    />
     {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
  </div>
);

interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  tooltip?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  tooltip,
}) => (
  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 focus-within:border-blue-500 transition duration-150 ease-in-out">
    <LabelWithTooltip label={label} tooltip={tooltip} />
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-none focus:ring-0 text-lg px-2 py-1"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface DateFieldProps {
  label: string;
  id: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  tooltip?: string;
}

export const DateField: React.FC<DateFieldProps> = ({
  label,
  id,
  selected,
  onChange,
  placeholderText,
  tooltip,
}) => (
  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 focus-within:border-blue-500 transition duration-150 ease-in-out">
    <LabelWithTooltip label={label} tooltip={tooltip} />
    <DatePicker
      id={id}
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      className="w-full bg-transparent border-none focus:ring-0 text-lg px-2 py-1"
      placeholderText={placeholderText}
    />
  </div>
);

interface TimeFieldProps {
  label: string;
  id: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  tooltip?: string;
  helpText?: string;
}

export const TimeField: React.FC<TimeFieldProps> = ({
  label,
  id,
  selected,
  onChange,
  placeholderText,
  tooltip,
  helpText,
}) => (
  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 focus-within:border-blue-500 transition duration-150 ease-in-out">
    <LabelWithTooltip label={label} tooltip={tooltip} />
    <DatePicker
      id={id}
      selected={selected}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption="時間"
      dateFormat="HH:mm"
      className="w-full bg-transparent border-none focus:ring-0 text-lg px-2 py-1"
      placeholderText={placeholderText}
    />
    {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
  </div>
);

interface RangeFieldProps {
  label: string;
  id: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step?: number;
  tooltip?: string;
}

export const RangeField: React.FC<RangeFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  min,
  max,
  step = 1,
  tooltip,
}) => (
  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 focus-within:border-blue-500 transition duration-150 ease-in-out">
    <LabelWithTooltip label={label} tooltip={tooltip} />
    <div className="flex items-center">
      <input
        type="range"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      <span className="ml-2">{value}</span>
    </div>
  </div>
);

interface MultiInputFieldProps {
  label: string;
  inputs: { id: string; value: string }[];
  onAdd: () => void;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  placeholder?: string;
  maxInputs: number;
  tooltip?: string;
  helpText?: string;
}

export const MultiInputField: React.FC<MultiInputFieldProps> = ({
  label,
  inputs,
  onAdd,
  onChange,
  onRemove,
  placeholder,
  maxInputs,
  tooltip,
  helpText,
}) => (
  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 focus-within:border-blue-500 transition duration-150 ease-in-out">
    <LabelWithTooltip label={label} tooltip={tooltip} />
    {inputs.map((input) => (
      <div key={input.id} className="flex items-center mb-2">
        <input
          type="text"
          value={input.value}
          onChange={(e) => onChange(input.id, e.target.value)}
          className="flex-grow bg-transparent border-none focus:ring-0 text-lg px-2 py-1"
          placeholder={placeholder}
        />
        <button onClick={() => onRemove(input.id)} className="ml-2 text-red-500 hover:text-red-700">
          削除
        </button>
      </div>
    ))}
    {inputs.length < maxInputs && (
      <button onClick={onAdd} className="mt-2 text-blue-500 hover:text-blue-700">
        追加
      </button>
    )}
    {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
  </div>
);

interface LabelWithTooltipProps {
  label: string;
  tooltip?: string;
}

export const LabelWithTooltip: React.FC<LabelWithTooltipProps> = ({ label, tooltip }) => (
  <div className="flex items-center mb-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {tooltip && (
      <div className="relative group ml-1">
        <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
        <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-sm rounded-md p-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 shadow-lg min-height-20">
          <div
            className={`px-3 py-2 ${tooltip.includes('\n') ? 'whitespace-pre-line' : 'whitespace-nowrap'}`}
          >
            {tooltip}
          </div>
          <div className="absolute h-2 w-2 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
        </div>
      </div>
    )}
  </div>
);
