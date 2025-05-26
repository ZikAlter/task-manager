import {FC, JSX} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import {Link} from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

interface Props {
    children: JSX.Element;
    allowedRoles?: string[]; // ← Новое
}

const ProtectedRoute: FC<Props> = ({children, allowedRoles}) => {
    const isAuth = useAuth();
    const userRole = localStorage.getItem("role"); // Или через useContext, если используешь

    // Не авторизован
    if (!isAuth) {
        return (
            <div className="h-screen font-roboto flex justify-center items-center flex-col gap-1">
                <h1 className="text-3xl font-bold text-blue-600">Доступ ограничен 😐</h1>
                <p className="text-blue-600">Вам нужно войти на сайт под своей учетной записью</p>
                <Link to={'/auth'}
                      className='bg-sky-500 rounded-md px-6 py-2 mt-4 hover:bg-sky-600 shadow-lg shadow-sky-400/90 text-white'>
                    Перейти к авторизации
                </Link>
            </div>
        );
    }

    // Авторизован, но нет доступа по роли
    if (allowedRoles && !allowedRoles.includes(userRole || '')) {
        return (
            <div className="h-screen font-roboto flex justify-center items-center flex-col gap-1">
                <h1 className="text-3xl font-bold text-rose-600">Нет прав доступа  </h1>
                <ImCancelCircle size={50} className="text-rose-600 m-2" />
                <p className="text-rose-600">Ваша учетная запись не имеет прав для просмотра этой страницы</p>
                <Link to={'/'}
                      className='bg-rose-500 rounded-md px-6 py-2 mt-4 hover:bg-rose-600 shadow-lg shadow-rose-400/90 text-white'>
                    Вернуться на главную
                </Link>
            </div>
        );
    }

    // Всё хорошо
    return children;
};

export default ProtectedRoute;
