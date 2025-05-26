import React, {useState} from "react";
import {LuEye, LuEyeOff} from "react-icons/lu";
import {FieldError} from "react-hook-form";

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: FieldError; // для отображения ошибки
}

const PasswordInput: React.FC<PasswordInputProps> = ({value, onChange, error}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                className={`py-3 shadow-md border-2 mt-3 rounded-2xl pl-2 pr-10 w-full outline-blue-500 bg-gray-50 ${
                    error ? 'border-red-500' : ''
                }`}
                placeholder="Пароль..."
                value={value}
                onChange={onChange}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                {showPassword ? <LuEyeOff size={25}/> : <LuEye size={25}/>}
            </button>
            {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default PasswordInput;
