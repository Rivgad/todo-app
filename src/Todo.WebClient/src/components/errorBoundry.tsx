import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { ErrorComponent } from ".";


function getErrorMessage(error: unknown): string | JSX.Element {
    if (isRouteErrorResponse(error)) {
        return error.data?.message
    } else if (error instanceof Error) {
        return error.message
    } else {
        console.error(error)
        return 'Неизвестная ошибка'
    }
}

export const ErrorBoundry: React.FC = () => {
    const error = useRouteError();

    return (
        <ErrorComponent>
            {error !== null && getErrorMessage(error)}
        </ErrorComponent>
    );
};
