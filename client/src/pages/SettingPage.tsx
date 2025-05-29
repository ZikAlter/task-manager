import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../components/PasswordInput";
import { FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
import {toast} from "react-toastify";

// Схема валидации
const schema = z.object({
    currentPassword: z.string().min(1, "Введите текущий пароль"),
    newPassword: z
        .string()
        .min(8, "Минимум 8 символов")
        .regex(/[a-zA-Z]/, "Должны быть латинские буквы")
        .regex(/[0-9]/, "Должна быть хотя бы одна цифра")
        .regex(/[^a-zA-Z0-9]/, "Должен быть спец. символ"),
});

type FormData = z.infer<typeof schema>;

const SettingPage: FC = () => {
    const {
        //register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.patch(
                'http://localhost:3000/api/user/change-password',
                {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // или где у тебя хранится токен
                    },
                }
            );
            toast.success(response.data.message || "Пароль успешно изменён!");
            reset(); // очистить форму
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "Ошибка при смене пароля"
                );
            } else {
                toast.error("Неизвестная ошибка");
            }
        }
    };

    return (
        <div className="container px-4 md:px-0">
            <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-600 max-md:mt-10">Настройки</h1>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
                <div className="w-full lg:basis-1/2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col w-full max-w-[450px] lg:w-[450px] h-fit shadow-xl rounded-2xl bg-white mt-4 p-4 md:p-6 mx-auto lg:mx-0"
                    >
                        <h2 className="block mt-2 md:mt-4 font-bold text-blue-500 text-xl md:text-2xl">Смена пароля</h2>
                        <label className="block mt-3 md:mt-4 font-medium text-blue-500 text-sm md:text-base">
                            Текущий пароль:
                        </label>
                        <PasswordInput
                            value={watch("currentPassword") || ""}
                            onChange={(e) => setValue("currentPassword", e.target.value)}
                            error={errors.currentPassword}
                        />
                        <label className="block mt-3 md:mt-4 font-medium text-blue-500 text-sm md:text-base">
                            Новый пароль:
                        </label>
                        <p className="font-medium text-gray-400 text-xs md:text-sm mt-2 md:mt-3">
                            *Пароль должен содержать минимум 8 символов, буквы латинского алфавита и цифры
                        </p>
                        <PasswordInput
                            value={watch("newPassword") || ""}
                            onChange={(e) => setValue("newPassword", e.target.value)}
                            error={errors.newPassword}
                        />

                        <button
                            type="submit"
                            className="text-white py-3 md:py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-4 md:mt-6 text-sm md:text-base"
                        >
                            Подтвердить изменения
                        </button>
                    </form>
                </div>
                <div className="w-full lg:basis-1/2 lg:self-center">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <p className="font-medium text-gray-500 mt-4 lg:mt-10 text-sm md:text-base px-4 lg:px-0">
                            У вас не подключены уведомления в Telegram боте.
                        </p>
                        <button
                            className="text-white py-3 md:py-4 px-6 md:px-8 mt-4 md:mt-6 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 shadow-lg shadow-sky-400/90 flex items-center group text-sm md:text-base"
                        >
                            <FaTelegramPlane className="mr-2 md:mr-3" size={20}/>
                            <span>Перейти в Telegram</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
