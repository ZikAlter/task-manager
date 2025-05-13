import {FC, useEffect, useState} from "react";
import axios from "axios";
import {MdFilterList} from "react-icons/md";

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
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/user');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            setLoading(false);
        }
    };

    /*const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
        try {
            await axios.patch(`http://localhost:3000/api/user/${userId}`, {
                statusAccount: !currentStatus
            });
            await fetchUsers();
        } catch (error) {
            console.error('Ошибка при изменении статуса пользователя:', error);
        }
    };*/

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSort = (key: string) => {
        if (sortConfig?.key === key) {
            setSortConfig({
                key,
                direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
            });
        } else {
            setSortConfig({key, direction: 'asc'});
        }
    };

    const sortedAndFilteredUsers = [...users]
        .filter((user) => {
            const fullName = `${user.surname} ${user.firstName} ${user.patronymic}`.toLowerCase();
            return fullName.includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            if (!sortConfig) return 0;

            const aValue = a[sortConfig.key as keyof User]?.toString().toLowerCase();
            const bValue = b[sortConfig.key as keyof User]?.toString().toLowerCase();

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

    return (
        <div>
            <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-600 max-md:mt-10">Редактировать данные пользователя</h1>

            <form className="mt-2" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        placeholder="Иванов Иван Иванович..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                    />
                </div>
            </form>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr className="bg-gray-100">
                        <th
                            onClick={() => handleSort('surname')}
                            className="px-6 py-3 cursor-pointer hover:underline relative group"
                        >
                            <div className="flex items-center">
                                <MdFilterList className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                <span>ФИО</span>
                            </div>
                        </th>
                        <th
                            onClick={() => handleSort('role')}
                            className="px-6 py-3 cursor-pointer hover:underline relative group"
                        >
                            <div className="flex items-center">
                                <MdFilterList className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                <span>Роль</span>
                            </div>
                        </th>
                        <th className="px-6 py-3">Статус аккаунта</th>
                        <th className="px-6 py-3">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 text-center">Загрузка...</td>
                        </tr>
                    ) : (
                        sortedAndFilteredUsers.map((user) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {`${user.surname} ${user.firstName} ${user.patronymic}`}
                                </th>
                                <td className="px-6 py-4">
                                    {user.role}
                                </td>
                                <td
                                    className={!user.statusAccount
                                        ? "px-6 py-4 font-medium text-rose-600"
                                        : "px-6 py-4"
                                    }
                                >
                                    {user.statusAccount ? 'Активен' : 'Заблокирован'}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="bg-blue-600 text-white py-3 px-4 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-400/90">
                                        Подробнее
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
                    className="flex self-center bg-green-600 text-white py-3 px-4 hover:bg-green-700 rounded-lg shadow-lg shadow-green-400/90 mt-5 mb-5">
                    <p>Обновить список</p>
                </button>
            </div>
        </div>
    );
};

export default EditUser;