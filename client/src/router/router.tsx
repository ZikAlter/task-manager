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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'create-user',
                element: (
                    <ProtectedRoute>
                        <CreateUser />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'create-task',
                element: (
                    <ProtectedRoute>
                        <CreateTask />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'edit-user',
                element: (
                    <ProtectedRoute>
                        <EditUser />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'ban-user',
                element: (
                    <ProtectedRoute>
                        <BanUser />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'auth',
                element: <Auth />,
            }
        ]
    }
])