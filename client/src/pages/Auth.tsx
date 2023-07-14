import React, {FC, useState} from "react";
import logo from '../assets/logotype.jpg';
import {useAppDispatch} from "../store/hooks.ts";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../service/auth.service.ts";
import {setTokenToLocalStorage} from "../helpers/localstorage.helper.ts";
import {toast} from "react-toastify";
import {logan} from "../store/user/userSlice.ts";


const Auth: FC = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => { // при авторизации
        try {
            e.preventDefault()
            const data = await AuthService.login({login, password})
            if (data) {
                setTokenToLocalStorage('token', data.token) // записываем данные в localStorage
                dispatch(logan(data)) // сохраняем данные в Store redux toolkit
                toast.success('Авторизация пройдена успешно')
                navigate('/') // отправлять пользователя после авторизации на главную страницу
            }
        } catch (err: any) {
            const error = err.response?.data.message // если получена ошибка
            toast.error(error.toString()) // показать сообщение об ошибке
        }
    }
    return (
        <div className="flex justify-center items-center h-full">
            <form className="flex flex-col w-[400px] h-[440px] shadow-xl rounded-2xl" onSubmit={loginHandler}>
                <div className="flex flex-col items-center text-center w-full justify-center">
                    <h1 className="text-xl text-cyan-600 mt-2">Авторизация пользователя</h1>
                    <img src={logo} alt="" className="h-[200px] w-[200px]"/>
                </div>
                <div className="container flex flex-col">
                    <input type="text" className="py-3 placeholder:text-sky-500 shadow-md border-2 rounded-xl pl-2 outline-sky-500" placeholder="Логин..." onChange={(e) => setLogin(e.target.value)} required/>
                    <input type="password" className="py-3 placeholder:text-sky-500 shadow-md border-2 mt-3 rounded-2xl pl-2 outline-sky-500" placeholder="Пароль..." onChange={(e) => setPassword(e.target.value)} required/>
                    <button className="text-white py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-3">
                        Войти
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Auth;