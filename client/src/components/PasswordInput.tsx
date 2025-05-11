import React, {useState} from "react";
import {LuEye, LuEyeOff} from "react-icons/lu"; // если используешь lucide-react

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({value, onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                className="py-3 placeholder:text-sky-500 shadow-md border-2 mt-3 rounded-2xl pl-2 pr-10 w-full outline-sky-500"
                placeholder="Пароль..."
                value={value}
                onChange={onChange}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                {showPassword ? <LuEyeOff size={25}/> : <LuEye size={25}/>}
            </button>
        </div>
    );
};

export default PasswordInput;
