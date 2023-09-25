import { useFetcher } from "react-router-dom";
import { InputGroup, Label, Input, Button, StyledLink } from "./components";
import { ErrorComponent } from "../../components/errorComponent";


export const SignInForm: React.FC = () => {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="post" action="/signin">
            <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="input-email" name="email" required />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="password">Пароль</Label>
                <Input type="password" id="input-password" name="password" required />
            </InputGroup>

            <Button type="submit" disabled={fetcher.state === "submitting"}>
                Войти
            </Button>

            {
                fetcher.data?.error &&
                <ErrorComponent message={fetcher.data?.error || 'Произошла ошибка. Пожалуйста, попробуйте снова.'}/>
            }

            <StyledLink to={'/signup'}>
                <p>Нет аккаунта? Зарегистрироваться</p>
            </StyledLink>
        </fetcher.Form>
    );
};
