import {FC} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../store/hooks.ts";
import {logout} from "../store/user/userSlice.ts";
import {removeTokenFromLocalStorage} from "../helpers/localstorage.helper.ts";
import {toast} from "react-toastify";
import {useAuth, useData} from "../hooks/useAuth.ts";
import anonim from '../assets/anonim.png';
import {IoIosNotifications} from "react-icons/io";
import logo from "../assets/logotype.jpg";


const Menu: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isAuth = useAuth()
    const isData = useData()
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

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        removeTokenFromLocalStorage('role')
        toast.success('Вы вышли из системы')
        navigate('/')
    }

    return (
        <>
            {isAuth ? (
                    <>
                        <div className="mt-3 flex flex-col text-center">
                            <div className="flex justify-center">
                                <img src={logo} alt="" className="h-[120px] w-[120px]"/>
                            </div>
                            <div className="flex justify-center">
                                <div className="flex-col">
                                    <p className="text-blue-600 font-bold text-sm">{userSurname} {userFirstname} {userPatronymic}</p>
                                    <p className="text-blue-600 font-bold text-sm">({userRole})</p>
                                </div>
                                <div className="ml-4 relative">
                                    <IoIosNotifications className="w-8 h-8 cursor-pointer text-amber-500"/>
                                    <span
                                        className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
                                </div>
                            </div>

                            <p className="mt-4">
                                <button
                                    className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg py-3 px-4 rounded-lg mr-2 shadow-blue-400/90">Настройки
                                </button>
                                <button
                                    className="bg-red-600 text-white hover:bg-red-700 shadow-lg py-3 px-4 rounded-lg shadow-red-400/90"
                                    onClick={logoutHandler}>Выйти
                                </button>
                            </p>
                            <nav className="mt-4 flex flex-col text-center">
                                <NavLink to={'/'} className={({isActive}) =>
                                    isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-gray-600 mt-4'
                                }>Список задач</NavLink>

                                {/* Только для роли 'Админ' */}
                                {userRole === 'Администратор' && (
                                    <>
                                <NavLink to={'/create-task'} className={({isActive}) =>
                                    isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-gray-600 mt-4'
                                }>Создать новую задачу</NavLink>
                                <NavLink to={'/create-user'} className={({isActive}) =>
                                    isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-gray-600 mt-4'
                                }>Создать учетную запись</NavLink>
                                <NavLink to={'/edit-user'} className={({isActive}) =>
                                    isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-gray-600 mt-4'
                                }>Редактировать пользователя</NavLink>
                                <NavLink to={'/ban-user'} className={({isActive}) =>
                                    isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-gray-600 mt-4'
                                }>Заблокировать пользователя</NavLink>
                                    </>
                                )}

                                <NavLink to={'/statistic'} className={({isActive}) =>
                                    isActive ? 'text-white bg-gradient-to-r from-sky-400 to-blue-500 py-4 shadow-lg shadow-sky-400/90 hover:cursor-pointer rounded-2xl mt-4' : 'text-gray-600 mt-4'
                                }>Статистика</NavLink>
                            </nav>
                        </div>
                    </>
                )
                : (
                    <div className="flex flex-col">
                        <div className="flex mt-3">
                            <img src={anonim} alt="" className="w-[50px] h-[50px]"/>
                            <h1 className="mb-5 text-blue-500 p-2">Неизвестный пользователь</h1>
                        </div>
                        <Link to={'/auth'}
                              className='bg-sky-500 rounded-md py-2 px-5 hover:bg-sky-600 shadow-lg shadow-sky-400/90 text-white max-md:mt-0 max-md:mx-0'>
                            Войти на сайт
                        </Link>
                    </div>
                )}
        </>
    );
};

export default Menu;