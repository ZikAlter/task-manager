import { FC } from "react";
import logo from "../assets/logotype.jpg";
import { useAppDispatch } from "../store/hooks.ts";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../service/auth.service.ts";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper.ts";
import { toast } from "react-toastify";
import { logan } from "../store/user/userSlice.ts";
import { useAuth } from "../hooks/useAuth.ts";
import PasswordInput from "../components/PasswordInput.tsx";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Схема валидации
const loginSchema = z.object({
    login: z.string().min(3, "Минимум 3 символа"),
    password: z.string()
        .min(6, "Минимум 8 символов")
        /*.regex(/[a-zA-Z]/, "Должны быть латинские буквы")*/
        /*.regex(/[0-9]/, "Должна быть хотя бы одна цифра")
        .regex(/[^a-zA-Z0-9]/, "Должен быть спец. символ")*/,
});

type LoginFormData = z.infer<typeof loginSchema>;

const Auth: FC = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const password = watch("password");

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await AuthService.login(data);

            if (result) {
                setTokenToLocalStorage("token", result.token);
                if (result.role) {
                    localStorage.setItem("role", result.role);
                }
                dispatch(logan(result));
                toast.success("Авторизация пройдена успешно");
                navigate("/");
            }
        } catch (err: any) {
            const error = err.response?.data.message || "Ошибка авторизации";
            toast.error(error.toString());
        }
    };

    if (isAuth) {
        return (
            <div className="h-screen font-roboto flex justify-center items-center flex-col gap-1">
                <h1 className="text-3xl font-bold text-blue-600">
                    Вы уже авторизованы 😊
                </h1>
                <Link
                    to={"/"}
                    className="bg-sky-500 rounded-md px-6 py-2 mt-4 hover:bg-sky-600 shadow-lg shadow-sky-400/90 text-white"
                >
                    Перейти к списку задач
                </Link>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-[400px] shadow-xl rounded-2xl bg-white max-md:mt-10 max-md:w-[350px] max-md:h-full pb-5"
            >
                <div className="flex flex-col items-center text-center w-full justify-center">
                    <h1 className="text-xl text-blue-600 mt-2 font-medium">
                        Авторизация пользователя
                    </h1>
                    <img src={logo} alt="" className="h-[200px] w-[200px]" />
                </div>

                <div className="container flex flex-col px-4 gap-2">
                    <input
                        {...register("login")}
                        type="text"
                        className={`py-3 shadow-md border-2 rounded-xl pl-2 outline-blue-500 bg-gray-50 ${errors.login ? 'border-red-500' : ''}`}

                        placeholder="Логин..."
                        autoComplete="off"
                    />
                    {errors.login && (
                        <p className="text-red-500 text-sm mt-[-6px]">
                            {errors.login.message}
                        </p>
                    )}

                    <PasswordInput
                        value={password}
                        onChange={(e) => setValue("password", e.target.value)}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        className="text-white py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-3"
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;
