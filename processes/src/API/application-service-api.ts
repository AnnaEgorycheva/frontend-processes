import axios from "axios";
import { ResultCodesEnum } from "./api";

const instanceWithAuth = axios.create({
    baseURL: 'https://hits-application-service.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});

export const applicationServiceAPI = {
    // APPLICATION-CONTROLLER
    getApplicationById(applicationId: string) {
        return instanceWithAuth.get(`api/applications/${applicationId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    addStatusToApplication(applicationId: string, status: string) {
        return instanceWithAuth.post(`api/applications/${applicationId}/status/${status}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    createApplication(positionId: string) {
        return instanceWithAuth.post(`api/applications/${positionId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    // INTERVIEW-CONTROLLER
    createApplicationInterview(applicationId: string, date: string, location: string) {
        const body = {
            date: date,
            location: location
        }
        return instanceWithAuth.post(`api/interviews/${applicationId}`, body)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getInterviewById(id: string) {
        return instanceWithAuth.get(`api/interviews/${id}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    deleteInterviewById(id: string) {
        return instanceWithAuth.delete(`api/interviews/${id}`)
    },
    // STUDENT-CONTROLLER
    getStudentApplicationsById(studentId: string) {
        return instanceWithAuth.get(`api/students/${studentId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
}