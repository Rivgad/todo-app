import axios from 'axios';
import Cookies from 'js-cookie'

export interface AuthService {
    isAuthenticated: boolean;
    signin(email: string, password: string): Promise<void>;
    signout(): Promise<void>;
    signup(email: string, password: string): Promise<void>;
}

class _AuthService implements AuthService {
    get isAuthenticated(): boolean {
        return Cookies.get('accessToken') != null
    }

    async signin(email: string, password: string): Promise<void> {
        const response = await axios.post('/api/signin', {
            "email": email,
            "password": password
        })

        const accessToken = response.data.accessToken
        Cookies.set('accessToken', accessToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    }

    async signout(): Promise<void> {
        Cookies.remove('accessToken')
        delete axios.defaults.headers.common["Authorization"];
    }

    async signup(email: string, password: string): Promise<void> {
        await axios.post('/api/signup', {
            "email": email,
            "password": password
        })
    }
}

export const authService = new _AuthService();