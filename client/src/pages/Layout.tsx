import {FC} from "react";
import {Outlet} from "react-router-dom";
import Menu from "../components/Menu.tsx";

const Layout: FC = () => {
    return (
        <div className="font-roboto flex">
            <div className="w-1/4 h-screen container border-r-2"> {/* bg-amber-100 */}
                <Menu />
            </div>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;