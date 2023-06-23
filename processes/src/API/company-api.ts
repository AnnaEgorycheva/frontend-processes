import axios from "axios";
import { ResultCodesEnum } from "./api";

const instanceWithAuth = axios.create({
    baseURL: 'https://company-service-6bc8.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});
export const companyAPI = {
    async getCompanies() {
        return await instanceWithAuth.get('/api/companies')
            .then(async response => {
                if (response.status === ResultCodesEnum.OK) {
                        return await response.data
                    } 
            })
    },
    getCompany(id: string | null) {
        return instanceWithAuth.get(`/api/company/info/${id}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                    console.log(response.data);
                        return response.data
                    }
            })
    },
    putCompany(id: string | null, companyName: string | null, companyDescription: string | null, companyContacts: string | null, companyAddress: string | null) {
        const body = {
            companyName: companyName,
            companyDescription: companyDescription,
            companyContacts: companyContacts,
            companyAddress: companyAddress,
          }
        return instanceWithAuth.put(`/api/company/edit/${id}`, body)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getIntershipPositions() {
        return instanceWithAuth.get('api/intershipPositions')
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                    console.log(response.data);
                        return response.data
                    }
            })
    },
    getCompanyIntershipPositions(id: string | null) {
        return instanceWithAuth.get(`/api/company/${id}/intershipPositions`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                    console.log(response.data);
                        return response.data
                    }
            })
    },
    getIntershipPositionInfo(id: string | null) {
        return instanceWithAuth.get(`/api/intershipPosition/info/${id}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                    console.log(response.data);
                        return response.data
                    }
            })
    },
}