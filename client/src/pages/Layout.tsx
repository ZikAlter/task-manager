import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from "../components/Menu.tsx";
import { FiMenu, FiX } from 'react-icons/fi'; // Импортируем иконки из react-icons

const Layout: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="font-roboto flex relative">
            {/* Бургер кнопка */}
            <button
                onClick={toggleMenu}
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors md:hidden"
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Меню (скрытое на мобильных устройствах, если не открыто) */}
            <div className={`
                fixed md:static top-0 left-0 h-screen bg-white z-40 shadow-lg md:shadow-none
                transition-all duration-300 
                ${isMenuOpen ? 'w-3/4 sm:w-1/2 md:w-1/4' : 'w-0 md:w-1/4'} 
                overflow-hidden
            `}>
                <div className="py-16 md:py-0 w-full h-full container">
                    <Menu />
                </div>
            </div>

            {/* Затемнение фона при открытом меню на мобильных устройствах */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleMenu}
                ></div>
            )}

            {/* Основной контент */}
            <div className="container p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;