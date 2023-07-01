import axios from "axios";
import { ResultCodesEnum } from "./api";
import { PracticePeriodGroupType } from "../Types/types";

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
        startDate: string, endDate: string,
        practiceOrder: string | null, practicePeriodName: string | null, 
        groups: Array<PracticePeriodGroupType> | null
    ) {
        const body = {
            startDate: startDate,
            endDate: endDate,
            practiceOrder: practiceOrder,
            practicePeriodName: practicePeriodName,
            groups: groups
        }
        return instanceWithAuth.post(`api/practicePeriod/create`, body)
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
    getPracticePeriodStudents(practicePeriodId: string) {
        return instanceWithAuth.get(`api/practicePeriod/${practicePeriodId}/students`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    // PracticeProfile
    createPracticeProfile(studentId: string, companyId: string | null,
        position: string | null, characteristic: string | null, 
        practiceDiary: string | null, practicePeriodId: string) 
        {
            const body = {
                userId: studentId,
                companyId: companyId,
                position: position,
                characteristic: characteristic,
                practiceDiary: practiceDiary,
                practicePeriodId: practicePeriodId
            }
            return instanceWithAuth.post(`api/practiceProfile/create`, body)
                .then(response => {
                    if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
                })
    },
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
    editPracticeProfile(practiceProfileId: string, position: string | null,
        characteristic: string | null, practiceDiary: string | null) 
        {
            const body = {
                position: position,
                characteristic: characteristic,
                practiceDiary: practiceDiary
            }
            return instanceWithAuth.put(`api/practiceProfile/edit/${practiceProfileId}`, body)
                .then(response => {
                    if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
                })
    }
}