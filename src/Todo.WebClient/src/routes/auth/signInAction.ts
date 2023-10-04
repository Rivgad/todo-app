import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authService } from "../../services/authService";


export const signInAction = async({ request }: LoaderFunctionArgs) => {
    const formData = await request.formData();

    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;

    if (!username) {
        return {
            error: "Введите логин",
        };
    }
    if (!password) {
        return {
            error: "Введите пароль",
        };
    }

    try {
        await authService.signin(username, password);
    }
    catch (error) {
        return {
            error: "Произошла ошибка. Попробуйте снова",
        };
    }

    return redirect("/");
}
