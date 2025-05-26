import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../components/PasswordInput";
import { FaTelegramPlane } from "react-icons/fa";

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
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    const onSubmit = (data: FormData) => {
        console.log("Смена пароля:", data);
        // тут будет отправка на сервер
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-600">Настройки</h1>
            <div className="flex flex-row">
                <div className="basis-1/2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col w-[450px] h-fit shadow-xl rounded-2xl bg-white mt-4 p-6"
                    >
                        <h2 className="block mt-4 font-bold text-blue-500 text-2xl">Смена пароля</h2>
                        <label className="block mt-4 font-medium text-blue-500">
                            Текущий пароль:
                        </label>
                        <PasswordInput
                            value={watch("currentPassword") || ""}
                            onChange={(e) => setValue("currentPassword", e.target.value)}
                            error={errors.currentPassword}
                        />
                        <label className="block mt-4 font-medium text-blue-500">
                            Новый пароль:
                        </label>
                        <p className="font-medium text-gray-400 text-sm mt-3">
                            *Пароль должен содержать минимум 8 символов, буквы латинского алфавита и цифры
                        </p>
                        <PasswordInput
                            value={watch("newPassword") || ""}
                            onChange={(e) => setValue("newPassword", e.target.value)}
                            error={errors.newPassword}
                        />

                        <button
                            type="submit"
                            className="text-white py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-6"
                        >
                            Подтвердить изменения
                        </button>
                    </form>
                </div>
                <div className="basis-1/2 self-center">
                    <p className="font-medium text-gray-500 mt-10">
                        У вас не подключены уведомления в Telegram боте.
                    </p>
                    <button
                        className="text-white py-4 px-8 mt-6 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 shadow-lg shadow-sky-400/90 flex items-center group"
                    >
                        <FaTelegramPlane className="mr-3" size={25}/>
                        <span>Перейти в Telegram</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
