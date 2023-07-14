import {FC} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../store/hooks.ts";
import {logout} from "../store/user/userSlice.ts";
import {removeTokenFromLocalStorage} from "../helpers/localstorage.helper.ts";
import {toast} from "react-toastify";
import {useAuth, useData} from "../hooks/useAuth.ts";
import anonim from '../assets/anonim.png';


const Menu: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isAuth = useAuth()
    const isData = useData()  // вытаскиваем данные из Store
    let userSurname, userFirstname, userPatronymic, userRole
    if (isData.isAuth === true) {
        userSurname = JSON.stringify(isData.user.surname)
        userSurname = JSON.parse(userSurname)

        userFirstname = JSON.stringify(isData.user.firstName)
        userFirstname = JSON.parse(userFirstname)

        userPatronymic = JSON.stringify(isData.user.patronymic)
        userPatronymic = JSON.parse(userPatronymic)

        userRole = JSON.stringify(isData.user.role)
        userRole = JSON.parse(userRole)

    }

    const logoutHandler = () => { // при выходе из сайта
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('Вы вышли из системы')
        navigate('/')
    }
 /*{userSurname} {userSurname} {userPatronymic} ({userRole}) */
    return (
        <>
            {isAuth ? (
                <>
                <div className="mt-4 flex flex-col text-center">
                <p className="text-sky-600 font-bold text-sm">{userSurname} {userFirstname} {userPatronymic}</p>
                <p className="text-sky-600 font-bold text-sm">({userRole})</p>
                <p>
                    <button className="bg-red-600 text-white py-3 px-4 hover:bg-red-700 rounded-lg shadow-lg shadow-red-400/90 " onClick={logoutHandler}>Выйти</button>
                </p>
                <nav className="mt-4 flex flex-col text-center">
                    <NavLink to={'/'} className={({isActive}) =>
                        isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-black mt-4'
                    }>Список задач</NavLink>
                    <NavLink to={'/create-task'} className={({isActive}) =>
                        isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-black mt-4'
                    }>Создать новую задачу</NavLink>
                    <NavLink to={'/create-user'} className={({isActive}) =>
                        isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-black mt-4'
                    }>Создать пользователя</NavLink>
                    <NavLink to={'/edit-user'} className={({isActive}) =>
                        isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-black mt-4'
                    }>Редактировать пользователя</NavLink>
                    <NavLink to={'/ban-user'} className={({isActive}) =>
                        isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-black mt-4'
                    }>Заблокировать пользователя</NavLink>
                </nav>
            </div>
                </>
            )
            : (
                <div className="flex flex-col">
                    <div className="flex mt-3">
                        <img src={anonim} alt="" className="w-[50px] h-[50px]"/>
                        <h1 className="mb-5 text-sky-500">Неизвестный пользователь</h1>
                    </div>
                    <Link to={'/auth'} className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600 shadow-lg shadow-sky-400/90 text-white'>
                        Войти на сайт
                    </Link>
                </div>
            )}
        </>
    );
};

export default Menu;