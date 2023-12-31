import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authService } from "../../services/authService";


export const signUpAction = async({ request }: LoaderFunctionArgs) => {
    const formData = await request.formData();

    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;
    const confirmPassword = formData.get("confirmPassword") as string | null;

    if (!username) {
        return {
            error: "Введите почту",
        };
    }
    if (!password) {
        return {
            error: "Введите пароль",
        };
    }
    if (confirmPassword !== password) {
        return {
            error: "Пароли не совпадают"
        }
    }

    try {
        await authService.signup(username, password);
    }
    catch (error) {
        return {
            error: "Произошла ошибка. Попробуйте снова",
        };
    }

    return redirect("/signin");
}