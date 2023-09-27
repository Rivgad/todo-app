import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from "axios";

import { authService } from "./services/authService";
import Layout from "./routes/layout";
import AuthPage from "./routes/auth/authPage";
import { signInAction } from "./routes/auth/signInAction";
import { signUpAction } from "./routes/auth/signUpAction";
import { SignUpForm } from "./routes/auth/signUpForm";
import { SignInForm } from "./routes/auth/signInForm";
import TodoList from "./routes/list/todoList";
import { todoListLoader } from "./routes/list/todoList.loader";
import { todoListAction } from "./routes/list/todoList.action";
import { ErrorPage } from "./components";
import { taskListLoader } from "./routes/list/task/taskList.loader";
import { TaskList } from "./routes/list/task/taskList";
import { taskListAction } from "./routes/list/task/taskList.action";


const accessToken = Cookies.get('accessToken')
if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: Layout,
        children: [
            {
                errorElement: <ErrorPage/>,
                children: [
                    {
                        index: true,
                        Component: TodoList,
                        loader: async ()=>{
                            if (!authService.isAuthenticated) {
                                return redirect("/signin");
                            }
                            return await todoListLoader()
                        }
                    },
                    {
                        path: "/list",
                        action: todoListAction,
                    },
                    {
                        path: "/list/:id",
                        loader: taskListLoader,
                        Component: TaskList,
                        action: taskListAction
                    },
                ]
            },
        ],
    },
    {
        Component: AuthPage,
        loader: () => {
            if (authService.isAuthenticated) {
                return redirect("/");
            }
            return null;
        },
        children: [
            {
                path: "/signin",
                action: signInAction,
                Component: SignInForm,
            },
            {
                path: "/signup",
                action: signUpAction,
                Component: SignUpForm
            },
            {
                path: "/logout",
                async loader() {
                    await authService.signout();
                    return redirect("/");
                }
            },
        ]
    },
]);

export default function App() {
    return (
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    );
}