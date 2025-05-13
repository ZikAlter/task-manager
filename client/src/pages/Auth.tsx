import React, {FC, useState} from "react";
import logo from '../assets/logotype.jpg';
import {useAppDispatch} from "../store/hooks.ts";
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../service/auth.service.ts";
import {setTokenToLocalStorage} from "../helpers/localstorage.helper.ts";
import {toast} from "react-toastify";
import {logan} from "../store/user/userSlice.ts";
import {useAuth} from "../hooks/useAuth.ts";
import PasswordInput from "../components/PasswordInput.tsx";

const Auth: FC = () => {
    const isAuth = useAuth();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({ login, password });

            if (data) {
                // Сохраняем токен
                setTokenToLocalStorage('token', data.token);

                // Сохраняем роль
                if (data.role) {
                    localStorage.setItem('role', data.role); // <--- вот это добавили
                }

                dispatch(logan(data));
                toast.success('Авторизация пройдена успешно');
                navigate('/');
            }
        } catch (err: any) {
            const error = err.response?.data.message || 'Ошибка авторизации';
            toast.error(error.toString());
        }
    };

    /* старая реализация

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({login, password});
            if (data) {
                setTokenToLocalStorage('token', data.token);
                dispatch(logan(data));
                toast.success('Авторизация пройдена успешно');
                navigate('/');
            }
        } catch (err: any) {
            const error = err.response?.data.message || 'Ошибка авторизации';
            toast.error(error.toString());
        }
    };*/

    if (isAuth) {
        return (
            <div className="h-screen font-roboto flex justify-center items-center flex-col gap-1">
                <h1 className="text-3xl font-bold text-blue-600">Вы уже авторизованы 😊</h1>
                <Link to={'/'}
                      className='bg-sky-500 rounded-md px-6 py-2 mt-4 hover:bg-sky-600 shadow-lg shadow-sky-400/90 text-white'>
                    Перейти к списку задач
                </Link>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-full">
            <form className="flex flex-col w-[400px] h-[440px] shadow-xl rounded-2xl bg-white max-md:mt-10 max-md:w-[350px] max-md:h-full" onSubmit={loginHandler}>
                <div className="flex flex-col items-center text-center w-full justify-center">
                    <h1 className="text-xl text-blue-600 mt-2 font-medium">Авторизация пользователя</h1>
                    <img src={logo} alt="" className="h-[200px] w-[200px]"/>
                </div>
                <div className="container flex flex-col">
                    <input type="text"
                           className="py-3 shadow-md border-2 rounded-xl pl-2 outline-blue-500 bg-gray-50"
                           placeholder="Логин..." onChange={(e) => setLogin(e.target.value)} autoComplete="off"
                           required/>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button
                        className="text-white py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-3">
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;
