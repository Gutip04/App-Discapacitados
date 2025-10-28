import type React from "react"

interface InputFieldProps{
    label: string
    type?: string
    value: string
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string // para agregar estilos adicionales
}

export function InputField({
    label,
    type= "text",
    value,
    onchange,
    placeholder = "",
    className = "",

}: InputFieldProps) {
    return(
        <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
                {label}
            </label>

            <input 
                type={type}
                value={value}
                onChange={onchange}
                placeholder={placeholder}
                className={`border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${className}`}

            />

        </div>
    )
}