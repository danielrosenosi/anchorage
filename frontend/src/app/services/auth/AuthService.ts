import Swal from "sweetalert2";

import api from "../ConfigApi";

interface IAuth {
    token: string;
}

const auth = async (email: string, password: string): Promise<IAuth | undefined> => {
    try {
        const { data } = await api.post("/login", {
            email,
            password
        }, {
            withCredentials: true
        });

        return data;
    } catch (error: any) {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        }).fire({
            icon: "error",
            title: "Credenciais inválidas!",
        });
    }
};

export const AuthService = { auth };