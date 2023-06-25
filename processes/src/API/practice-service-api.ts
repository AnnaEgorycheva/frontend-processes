import axios from "axios";
import { ResultCodesEnum } from "./api";

const instanceWithAuth = axios.create({
    baseURL: 'https://practice-service.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});

export const practiceServiceAPI = {
    // PracticePeriod
    createNewPracticePeriod(
        startDate: Date, endDate: Date,
        practiceOrder: string | null, practicePeriodName: string | null
    ) {
        const body = {
            startDate: String(startDate),
            endDate: String(endDate),
            practiceOrder: practiceOrder,
            practicePeriodName: practicePeriodName
        }
        return instanceWithAuth.post(`api/practicePeriod/create`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getPracticePeriodInfo(practicePeriodId: string) {
        return instanceWithAuth.get(`api/practicePeriod/info/${practicePeriodId}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getPracticePeriods() {
        return instanceWithAuth.get(`api/practicePeriods`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    
    // PracticeProfile
    getPracticeProfileInfo(practiceProfileId: string) {
        return instanceWithAuth.get(`api/practiceProfile/info/${practiceProfileId}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getPracticePeriodAndStudentPracticeProfile(studentId: string) {
        return instanceWithAuth.get(`api/user/${studentId}/practicePeriods`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
}