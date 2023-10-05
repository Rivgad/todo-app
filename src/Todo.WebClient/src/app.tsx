import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";

import { authService } from "./services/authService";
import Layout from "./routes/layout";
import AuthPage from "./routes/auth/authPage";
import { signInAction } from "./routes/auth/signInAction";
import { signUpAction } from "./routes/auth/signUpAction";
import { SignUpForm } from "./routes/auth/signUpForm";
import { SignInForm } from "./routes/auth/signInForm";
import TodoListComponent from "./routes/list/todoList";
import { todoListLoader } from "./routes/list/todoList.loader";
import { todoListAction } from "./routes/list/todoList.action";
import { ErrorPage } from "./components";
import { taskListLoader } from "./routes/list/task/taskList.loader";
import { TaskList } from "./routes/list/task/taskList";
import { createTaskAction, deleteTaskAction, updateTaskAction } from "./routes/list/task/taskList.actions";


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
                        Component: TodoListComponent,
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
                    },
                    {
                        path: "/list/:id/create",
                        action: createTaskAction,
                    },
                    {
                        path: "/list/:id/:taskId/update",
                        action: updateTaskAction,
                    },
                    {
                        path: "/list/:id/:taskId/delete",
                        action: deleteTaskAction,
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