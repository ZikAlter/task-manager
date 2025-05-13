import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import PasswordInput from "../components/PasswordInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Схема валидации
const schema = z.object({
    login: z.string().min(3, "Минимум 3 символа"),
    password: z.string()
        .min(8, "Минимум 8 символов")
        .regex(/[a-zA-Z]/, "Должны быть латинские буквы")
        .regex(/[0-9]/, "Должна быть хотя бы одна цифра")
        .regex(/[^a-zA-Z0-9]/, "Должен быть спец. символ"),
    surname: z.string().min(1, "Обязательно"),
    firstName: z.string().min(1, "Обязательно"),
    patronymic: z.string().min(1, "Обязательно"),
    role: z.enum(["Пользователь", "Руководитель", "Администратор"]),
});

type FormData = z.infer<typeof schema>;

const CreateUser: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: "Пользователь",
        },
    });

    const password = watch("password");

    const onSubmit = async (data: FormData) => {
        try {
            await axios.post("http://localhost:3000/api/user", {
                ...data,
                statusAccount: true
            });
            toast.success("Учетная запись успешно создана!");
            reset(); // очистить форму
        } catch (error: any) {
            const message = error.response?.data?.message || "Ошибка при создании учетной записи";
            toast.error(message);
        }
    };

    return (
        <div>
            <h1 className="mt-4 mb-4 text-4xl font-bold text-center text-blue-600">Создать новую учетную запись</h1>
            <div className="flex justify-center items-center h-full">
                <form
                    className="flex flex-col w-[500px] h-fit shadow-xl rounded-2xl bg-white mt-4 p-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        type="text"
                        className={`mt-2 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500 ${errors.login ? 'border-red-500' : ''}`}
                        placeholder="Логин..."
                        {...register("login")}
                        autoComplete="off"
                    />
                    {errors.login && <p className="text-red-600 text-sm mt-1">{errors.login.message}</p>}

                    <PasswordInput
                        value={password}
                        onChange={(e) => setValue("password", e.target.value)}
                        error={errors.password}
                    />

                    <input
                        type="text"
                        className={`mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500 ${errors.surname ? 'border-red-500' : ''}`}
                        placeholder="Фамилия..."
                        {...register("surname")}
                        autoComplete="off"
                    />
                    {errors.surname && <p className="text-red-600 text-sm mt-1">{errors.surname.message}</p>}

                    <input
                        type="text"
                        className={`mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="Имя..."
                        {...register("firstName")}
                        autoComplete="off"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}

                    <input
                        type="text"
                        className={`mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500 ${errors.patronymic ? 'border-red-500' : ''}`}
                        placeholder="Отчество..."
                        {...register("patronymic")}
                        autoComplete="off"
                    />
                    {errors.patronymic && <p className="text-red-600 text-sm mt-1">{errors.patronymic.message}</p>}

                    <label htmlFor="role" className="block mt-4 font-medium text-blue-500">Выберите роль:</label>
                    <select
                        id="role"
                        className="mt-2 shadow-md border-2 rounded-xl bg-gray-50 text-gray-900 focus:outline-blue-500 p-2.5"
                        {...register("role")}
                    >
                        <option value="Пользователь">Пользователь</option>
                        <option value="Руководитель">Руководитель</option>
                        <option value="Администратор">Администратор</option>
                    </select>
                    {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>}

                    <button
                        type="submit"
                        className="text-white py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-6"
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
