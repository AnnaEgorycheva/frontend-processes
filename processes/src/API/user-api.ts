import axios from "axios";
import { ResultCodesEnum } from "./api";

const instanceWithoutAuth = axios.create({
    baseURL: 'https://hits-user-service.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});
const instanceWithAuth = axios.create({
    baseURL: 'https://hits-user-service.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});

export const userAPI = {
    authenticate(email: string | null, password: string | null) {
        const body = {
            email: email,
            password: password
        }
        return instanceWithoutAuth.post(`authenticate`, body)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
            .catch(error => {
                console.log(error.response.data.error)
            });
    },
    getUsersByEmail(email: string | null) {
        return instanceWithAuth.get(`users/${email}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getUsersByToken() {
        return instanceWithAuth.get(`users/jwt`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getUsersByRole(role: 'STUDENT' | 'SCHOOL' | 'COMPANY') {
        return instanceWithAuth.get(`users/roles/${role}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    }
}