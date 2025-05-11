import {FC, JSX} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import {Link} from "react-router-dom";

interface Props {
    children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth()
    return <>
        {isAuth ? children : (
            <div className="h-screen font-roboto flex justify-center items-center flex-col gap-1">
                <h1 className="text-3xl font-bold">Доступ ограничен 😐</h1>
                <p>Вам нужно войти на сайт под своей учетной записью</p>
                <Link to={'/auth'}
                      className='bg-sky-500 rounded-md px-6 py-2 mt-4 hover:bg-sky-600 shadow-lg shadow-sky-400/90 text-white'>
                    Перейти к авторизации
                </Link>
            </div>
        )}
    </>
};

export default ProtectedRoute;