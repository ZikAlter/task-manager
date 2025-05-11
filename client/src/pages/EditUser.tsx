import {FC, useEffect, useState} from "react";
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

const EditUser: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/user');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            if (axios.isAxiosError(error)) {
                console.error('Детали ошибки:', {
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data
                });
            }
            setLoading(false);
        }
    };

    const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
        try {
            await axios.patch(`http://localhost:3000/api/user/${userId}`, {
                statusAccount: !currentStatus
            });
            await fetchUsers(); // Обновляем список после изменения
        } catch (error) {
            console.error('Ошибка при изменении статуса пользователя:', error);
            if (axios.isAxiosError(error)) {
                console.error('Детали ошибки:', {
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data
                });
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-600">Редактировать пользователя</h1>

            <form className="mt-2">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Иванов Иван Иванович..." required/>
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Найти
                    </button>
                </div>
            </form>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr className="bg-gray-100">
                        <th scope="col" className="px-6 py-3">
                            ФИО
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Роль
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Статус аккаунта
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Действие
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 text-center">Загрузка...</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {`${user.surname} ${user.firstName} ${user.patronymic}`}
                                </th>
                                <td className="px-6 py-4">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4">
                                    {user.statusAccount ? 'Активен' : 'Заблокирован'}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="bg-blue-600 text-white py-3 px-4 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-400/90">Подробнее
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    onClick={fetchUsers}
                    className="flex self-center bg-green-600 text-white py-3 px-4 hover:bg-green-700 rounded-lg shadow-lg shadow-green-400/90 mt-5">
                    <p>Обновить список</p>
                </button>
            </div>
        </div>
    );
};

export default EditUser;