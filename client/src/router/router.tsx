import Home from "../pages/Home.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Layout from "../pages/Layout.tsx";
import {createBrowserRouter} from "react-router-dom";
import Auth from "../pages/Auth.tsx";
import CreateTask from "../pages/CreateTask.tsx";
import CreateUser from "../pages/CreateUser.tsx";
import EditUser from "../pages/EditUser.tsx";
import BanUser from "../pages/BanUser.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Statistic from "../pages/Statistic.tsx";
import SettingPage from "../pages/SettingPage.tsx";
import TaskPage from "../pages/TaskPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'task/:id',
                element: (
                    <ProtectedRoute>
                        <TaskPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'create-user',
                element: (
                    <ProtectedRoute allowedRoles={['Администратор']}>
                        <CreateUser/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'create-task',
                element: (
                    <ProtectedRoute allowedRoles={['Администратор', 'Руководитель']}>
                        <CreateTask/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'edit-user',
                element: (
                    <ProtectedRoute allowedRoles={['Администратор']}>
                        <EditUser/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'ban-user',
                element: (
                    <ProtectedRoute allowedRoles={['Администратор']}>
                        <BanUser/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'statistic',
                element: (
                    <ProtectedRoute>
                        <Statistic/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'setting',
                element: (
                    <ProtectedRoute>
                        <SettingPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'auth',
                element: <Auth/>,
            }
        ]
    }
])