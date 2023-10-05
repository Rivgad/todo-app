import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";

import { authService } from "./services/authService";
import Layout from "./routes/layout";
import AuthPage from "./routes/auth/authPage";
import { signInAction } from "./routes/auth/signInAction";
import { signUpAction } from "./routes/auth/signUpAction";
import { SignUpForm } from "./routes/auth/signUpForm";
import { SignInForm } from "./routes/auth/signInForm";
import { TodoLists } from "./routes/list/todoLists";
import { todoListsLoader } from "./routes/list/todoLists.loader";
import { createTodoListAction, deleteTodoListAction } from "./routes/list/todoLists.actions";
import { ErrorPage } from "./components";
import { taskListLoader } from "./routes/list/task/todoItemComponent.loader";
import { TodoItemList } from "./routes/list/task/todoItemList";
import { createTodoItemAction, deleteTodoItemAction, updateTodoItemAction } from "./routes/list/task/todoItemComponent.actions";


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
                        Component: TodoLists,
                        loader: async ()=>{
                            if (!authService.isAuthenticated) {
                                return redirect("/signin");
                            }
                            return await todoListsLoader()
                        }
                    },
                    {
                        path: "/list/create",
                        action: createTodoListAction,
                    },
                    {
                        path: "/list/:id",
                        loader: taskListLoader,
                        Component: TodoItemList,
                    },
                    {
                        path: "/list/delete",
                        action: deleteTodoListAction,
                    },
                    {
                        path: "/list/:id/create",
                        action: createTodoItemAction,
                    },
                    {
                        path: "/list/:id/:todoItemId/update",
                        action: updateTodoItemAction,
                    },
                    {
                        path: "/list/:id/:todoItemId/delete",
                        action: deleteTodoItemAction,
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