import { FC, useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    login: string;
    firstName: string;
    surname: string;
    patronymic: string;
    role: string;
    statusAccount: boolean;
}

const CreateTask: FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get<User[]>('http://localhost:3000/api/user')
            .then(response => setUsers(response.data))
            .catch(error => console.error("Ошибка при загрузке пользователей:", error));
    }, []);

    return (
        <div>
            <h1 className="mt-4 mb-4 text-4xl font-bold text-center text-blue-600">Создать новую задачу</h1>
            <div className="flex justify-center items-center h-full">
                <form className="flex flex-col w-[500px] h-fit shadow-xl rounded-2xl bg-white mt-4 mb-4 p-6">
                    <label htmlFor="title_task" className="block mt-4 font-medium text-blue-500">
                        Укажите наименование задачи:
                    </label>
                    <input
                        type="text"
                        className="mt-2 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500"
                        placeholder="Наименование задачи..."
                        autoComplete="off"
                        id="title_task"
                    />

                    <label htmlFor="importance" className="block mt-4 font-medium text-blue-500">
                        Степень срочности задачи:
                    </label>
                    <select
                        id="importance"
                        className="mt-2 shadow-md border-2 rounded-xl bg-gray-50 text-gray-900 focus:outline-blue-500 p-2.5"
                    >
                        <option value="Обычная">Обычная</option>
                        <option value="Средняя">Средняя</option>
                        <option value="Срочно">Срочно</option>
                    </select>

                    <label htmlFor="task_user" className="block mt-4 font-medium text-blue-500">
                        Выберите исполнителя:
                    </label>
                    <select
                        id="task_user"
                        className="mt-2 shadow-md border-2 rounded-xl bg-gray-50 text-gray-900 focus:outline-blue-500 p-2.5"
                    >
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.surname} {user.firstName} {user.patronymic}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="date_task" className="block mt-4 font-medium text-blue-500">
                        Укажите крайний срок исполнения задачи:
                    </label>
                    <input
                        type="datetime-local"
                        className="mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500"
                        autoComplete="off"
                        id="date_task"
                    />

                    <label htmlFor="description" className="block mt-4 font-medium text-blue-500">
                        Опишите подробности задачи:
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        cols={20}
                        rows={5}
                        className="mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500"
                    >
                        Описание задачи
                    </textarea>

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

export default CreateTask;
