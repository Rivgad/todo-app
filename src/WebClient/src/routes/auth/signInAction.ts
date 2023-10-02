import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authService } from "../../services/authService";


export const signInAction = async({ request }: LoaderFunctionArgs) => {
    const formData = await request.formData();

    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email) {
        return {
            error: "Введите почту",
        };
    }
    if (!password) {
        return {
            error: "Введите пароль",
        };
    }

    try {
        await authService.signin(email, password);
    }
    catch (error) {
        return {
            error: "Произошла ошибка. Попробуйте снова",
        };
    }

    return redirect("/");
}