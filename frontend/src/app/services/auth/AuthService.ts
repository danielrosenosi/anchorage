import api from "../ConfigApi";

interface IAuth {
    accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | undefined> => {
    try {
        const { data } = await api.post("/login", {
            email,
            password
        }, {
            withCredentials: true
        });

        if (data) {
            return data.accessToken;
        }

        return undefined;
    } catch (error) {
        console.log(error);
    }
};

export const AuthService = {
    auth,
};