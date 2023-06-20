import axios from "axios";
import { ResultCodesEnum } from "./api";

// const instance = axios.create({
//     baseURL: 'https://hits-user-service.onrender.com/',
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

const instance = axios.create({
    baseURL: 'https://hits-user-service.onrender.com/'
});

export const userAPI = {
    authenticate(email: string | null, password: string | null) {
        const body = {
            email: email,
            password: password
        }
        return instance.post(`authenticate`, body, {headers: {
                 'Content-Type': 'application/json',
            }})
            .then(response => {
                console.log(response)
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
            .catch(error => {
                console.log(error.response.data.error)
            });
    },
    getUsersByEmail(email: string | null) {
        return instance.get(`users/${email}`, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getUsersByRole(role: 'STUDENT' | 'SCHOOL' | 'COMPANY') {
        return instance.get(`users/roles/${role}`, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === ResultCodesEnum.OK) {
                    return response.data
                }
        })
    }
}