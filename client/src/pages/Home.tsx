import {FC} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import {Link} from "react-router-dom";
//import dateFormat from "dateformat";

const Home: FC = () => {

    const isAuth = useAuth()
    /*let nowData = new Date()
    let oneData = nowData.toISOString()
    oneData = dateFormat(oneData, "dd.mm.yyyy hh:mm")*/

    return (
        <>
        {isAuth ? (
            <div>
                <h1 className="mt-2">Список задач</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr className="bg-gray-100">
                            <th scope="col" className="px-6 py-3">
                                Дата создания
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Наименование задачи
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Степень срочности
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Автор задачи
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Действие
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    13.07.2023 12:07
                                </th>
                                <td className="px-6 py-4">
                                    Сдать отчет
                                </td>
                                <td className="px-6 py-4">
                                    Срочно
                                </td>
                                <td className="px-6 py-4">
                                    Петров Иван Романович
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#"
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Подробнее</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    13.07.2023 12:07
                                </th>
                                <td className="px-6 py-4">
                                    Перезагрузить сервер
                                </td>
                                <td className="px-6 py-4">
                                    Обычная
                                </td>
                                <td className="px-6 py-4">
                                    Петров Иван Романович
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#"
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Подробнее</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className="h-screen font-roboto flex justify-center items-center flex-col gap-1">
                <h1 className="text-3xl font-bold">Доступ ограничен 😐</h1>
                <p>Вам нужно войти на сайт под своей учетной записью</p>
                <Link to={'/auth'} className='bg-sky-500 rounded-md px-6 py-2 mt-4 hover:bg-sky-600 shadow-lg shadow-sky-400/90 text-white'>
                    Перейти к авторизации
                </Link>
            </div>
        )}
        </>
    );
};

export default Home;