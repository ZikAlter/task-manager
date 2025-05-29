import { FC, useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { ICreateTask } from "../types/task.interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState<ICreateTask>({
        titleTask: '',
        importance: 'Обычная',
        user: 0,
        endedAt: new Date(),
        contractor: 0,
        descript: ''
    });

    const reset = () => {
        setFormData({
            titleTask: '',
            importance: 'Обычная',
            user: 0,
            endedAt: new Date(),
            contractor: 0,
            descript: ''
        });
    };

    useEffect(() => {
        axios.get<User[]>('http://localhost:3000/api/user')
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error("Ошибка при загрузке пользователей:", error);
                toast.error("Не удалось загрузить список пользователей");
            });
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/tasks', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success("Задача успешно создана");
            reset();
            //navigate('/');
        } catch (error) {
            console.error("Ошибка при создании задачи:", error);
            toast.error("Произошла ошибка при создании задачи");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: id === 'endedAt' ? new Date(value) : value
        }));
    };

    return (
        <div>
            <h1 className="mt-4 mb-4 text-4xl font-bold text-center text-blue-600">Создать новую задачу</h1>
            <div className="flex justify-center items-center h-full">
                <form onSubmit={handleSubmit} className="flex flex-col w-[500px] h-fit shadow-xl rounded-2xl bg-white mt-4 mb-4 p-6">
                    <label htmlFor="titleTask" className="block mt-4 font-medium text-blue-500">
                        Укажите наименование задачи:
                    </label>
                    <input
                        type="text"
                        className="mt-2 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500"
                        placeholder="Наименование задачи..."
                        autoComplete="off"
                        id="titleTask"
                        value={formData.titleTask}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="importance" className="block mt-4 font-medium text-blue-500">
                        Степень срочности задачи:
                    </label>
                    <select
                        id="importance"
                        className="mt-2 shadow-md border-2 rounded-xl bg-gray-50 text-gray-900 focus:outline-blue-500 p-2.5"
                        value={formData.importance}
                        onChange={handleChange}
                        required
                    >
                        <option value="Обычная">Обычная</option>
                        <option value="Средняя">Средняя</option>
                        <option value="Срочно">Срочно</option>
                    </select>

                    <label htmlFor="contractor" className="block mt-4 font-medium text-blue-500">
                        Выберите исполнителя:
                    </label>
                    <select
                        id="contractor"
                        className="mt-2 shadow-md border-2 rounded-xl bg-gray-50 text-gray-900 focus:outline-blue-500 p-2.5"
                        value={formData.contractor}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите исполнителя</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.surname} {user.firstName} {user.patronymic}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="endedAt" className="block mt-4 font-medium text-blue-500">
                        Укажите крайний срок исполнения задачи:
                    </label>
                    <input
                        type="datetime-local"
                        className="mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500"
                        autoComplete="off"
                        id="endedAt"
                        value={formData.endedAt.toLocaleString('sv', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(' ', 'T')}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="descript" className="block mt-4 font-medium text-blue-500">
                        Опишите подробности задачи:
                    </label>
                    <textarea
                        id="descript"
                        className="mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500"
                        value={formData.descript}
                        onChange={handleChange}
                        required
                    />

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
