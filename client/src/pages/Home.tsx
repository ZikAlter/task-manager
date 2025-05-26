import {FC, useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import {Link} from "react-router-dom";
import {TaskService} from "../services/task.service";
import {ITask} from "../types/task.interface";
import dateFormat from "dateformat";
import {MdFilterList} from "react-icons/md";

const Home: FC = () => {
    const isAuth = useAuth();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        if (isAuth) loadTasks();
    }, [isAuth]);

    const loadTasks = async () => {
        try {
            const data = await TaskService.getAll();
            setTasks(data);
        } catch (error) {
            console.error('Ошибка при загрузке задач:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const filteredTasks = tasks
        .filter(task =>
            task.titleTask.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const compare = (valA: string | number, valB: string | number) => {
                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            };

            switch (sortField) {
                case 'createdAt':
                    return compare(new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime());
                case 'importance':
                    const importanceMap: Record<string, number> = {
                        'Срочно': 3,
                        'Средняя': 2,
                        'Низкая': 1
                    };
                    return compare(importanceMap[a.importance] || 0, importanceMap[b.importance] || 0);
                case 'author':
                    return compare(
                        `${a.user.surname} ${a.user.firstName} ${a.user.patronymic}`,
                        `${b.user.surname} ${b.user.firstName} ${b.user.patronymic}`
                    );
                default:
                    return 0;
            }
        });

    return (
        <>
            {isAuth ? (
                <div>
                    <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-600 max-md:mt-10">Список задач</h1>

                    {/* Поиск */}
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
                            placeholder="Поиск задачи..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            autoComplete="off"
                        />
                        </div>
                    </form>

                    {/* Таблица */}
                    {loading ? (
                        <div className="flex justify-center items-center mt-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th onClick={() => handleSort('createdAt')} className="px-6 py-3 cursor-pointer hover:underline">
                                        <div className="flex items-center group">
                                            <MdFilterList className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                            <span>Дата создания</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3">Наименование задачи</th>
                                    <th onClick={() => handleSort('importance')} className="px-6 py-3 cursor-pointer hover:underline">
                                        <div className="flex items-center group">
                                            <MdFilterList className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                            <span>Степень срочности</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('author')} className="px-6 py-3 cursor-pointer hover:underline">
                                        <div className="flex items-center group">
                                            <MdFilterList className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                            <span>Автор задачи</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3">Действие</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredTasks.map((task) => (
                                    <tr key={task.id}
                                        className={task.importance === 'Срочно' ? 'bg-red-200 border-b' : 'bg-white border-b'}>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {dateFormat(task.createdAt, "dd.mm.yyyy HH:MM")}
                                        </td>
                                        <td className="px-6 py-4">{task.titleTask}</td>
                                        <td className="px-6 py-4 font-medium">
                                            {task.importance === 'Срочно' ? (
                                                <span className="text-rose-600">🔥 {task.importance}</span>
                                            ) : task.importance === 'Средняя' ? (
                                                <span className="text-orange-600">{task.importance}</span>
                                            ) : (
                                                <span>{task.importance}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {`${task.user.surname} ${task.user.firstName} ${task.user.patronymic}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/task`}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Подробнее
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Кнопки */}
                    <div className="flex flex-row gap-x-10">
                        <button onClick={loadTasks}
                                className="bg-green-600 text-white py-3 px-4 hover:bg-green-700 rounded-lg shadow-lg mt-5 shadow-green-400/80">
                            Обновить список задач
                        </button>
                        <button
                            className="bg-blue-600 text-white py-3 px-4 hover:bg-blue-700 rounded-lg shadow-lg mt-5 shadow-blue-400/90">
                            Архив задач
                        </button>
                    </div>
                </div>
            ) : (
                <div className="h-screen flex justify-center items-center flex-col gap-1">
                    <h1 className="text-3xl font-bold text-blue-600">Доступ ограничен 😐</h1>
                    <p className="text-blue-600">Вам нужно войти на сайт под своей учетной записью</p>
                    <Link to={'/auth'}
                          className='bg-sky-500 rounded-md px-6 py-2 mt-4 hover:bg-sky-600 shadow-lg text-white shadow-sky-400/90'>
                        Перейти к авторизации
                    </Link>
                </div>
            )}
        </>
    );
};

export default Home;
