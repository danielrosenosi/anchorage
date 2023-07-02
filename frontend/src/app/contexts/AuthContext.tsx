import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
    useState
} from 'react';

import { AuthService } from '../services/auth/AuthService';
import { useEffect } from 'react';

type AuthContextType = {
    logout: () => void;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>
};

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "APP_ACCESS_TOKEN";

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [accessTokem, setAccessToken] = useState<string>();

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);

        if (result instanceof Error) {
            return result.message;
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(String(result?.accessToken)));
            setAccessToken(result?.accessToken);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        setAccessToken(undefined);
    }, []);

    const isAuthenticated = useMemo(() => !!accessTokem, [accessTokem]);

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if (accessToken) {
            setAccessToken(JSON.parse(accessToken));
        } else {
            setAccessToken(undefined);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};