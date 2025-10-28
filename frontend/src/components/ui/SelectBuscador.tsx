import React from "react";
import Select from "react-select";

interface SelectOption {
  value: number;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: number;
  onChange: (value: number | undefined) => void;
  loading: boolean;
  error: string;
}

export const SelectBuscador: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  loading,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      {loading ? (
        <p className="text-gray-500">Cargando {label.toLowerCase()}...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <Select
          options={options}
          value={
            value
              ? { value, label: options.find((o) => o.value === value)?.label }
              : null
          }
          onChange={(selected) => onChange(selected ? Number(selected.value) : undefined)}
          placeholder={`Seleccione ${label.toLowerCase()}...`}
          isClearable
          className="text-sm"
          required
        />
      )}
    </div>
  );
};
