import {FC} from "react";
import {Link} from "react-router-dom";

const ErrorPage: FC = () => {
    return (
        <div className="h-screen font-roboto flex justify-center items-center flex-col gap-1">
            <h1 className="text-3xl font-bold">Ошибка 404 🙁</h1>
            <p>Страница не найдена</p>
            <Link to={'/'} className='bg-sky-500 rounded-md px-6 py-2 mt-4 hover:bg-sky-600 shadow-lg shadow-sky-400/90 text-white'>
                Вернуться на главную
            </Link>
        </div>
    );
};

export default ErrorPage;