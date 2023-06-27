export type PracticePeriod = {
    id: string | null,
    startDate: string,
    endDate: string,
    practiceOrder: string | null,
    practicePeriodName: string | null 
}
export type PracticePeriodInfo = {
    id: string | null,
    practicePeriodName: string | null 
}
export type PracticePeriodCreateUpdate = {
    startDate: string,
    endDate: string,
    practiceOrder: string | null,
    practicePeriodName: string | null 
}

export type PracticeProfile = {
    practiceProfileId: string | null,
    userId: string | null,
    companyId: string | null,
    position: string | null,
    characteristic: string | null,
    practiceDiary: string | null,
    practicePeriodId: string | null
}
export type PracticePeriodAndStudentPracticeProfile = {
    practicePeriodName: string | null,
    practiceProfileId: string | null
}
export type PracticeProfileUpdateDto = {
    position: string | null,
    characteristic: string | null,
    practiceDiary: string | null,
}

export type UserDtoType = {
    userId: string,
    firstName: string,
    lastName: string,
    patronym?: string | null,
    role: string,
    email: string,
    groupNumber?: string | null,
    companyId?: string | number | null
}

export type IntershipPositionType = {
    intershipPositionId: string,
    companyId: number | string,
    companyName: string,
    intershipPositionName: string,
    intershipPositionDescription?: string | null,
    intershipPositionCount: number | string,
}
export type IntersipPositionCreationType = {
    companyId: number | string | null,
    intershipPositionName: string | null,
    intershipPositionDescription: string | null,
    intershipPositionskills?: string | undefined | null,
    intershipPositionCount: number | string | null
}
export type PositionType = {
    id: number | string
    name: string
    description: string
    skills?: string
    places: number | null | undefined
    companyName: string
    applicationsNumber: number| null | undefined
}

export type StudentType = {
    id: number | string
    firstName: string
    lastName: string
    patronym?: string
    role: string
    email: string
}

export type CompanyInfoType = {
    companyName: string,
    companyDescription?: string | null,
    companyContacts?: string | null,
    companyAddress?: string | null
}

export type ApplicationType = {
    applicationId: number | string
    positionName: string
    companyName : string
    status: string
    user: {
        id: string | number
        lastName: string
        patronym?: string
        firstName: string
    }
}

export interface ICompany {
    companyName: string,
    companyId: number,
    companyDescription: string,
    companyContacts: string,
    companyAddress: string,
}

export interface IPosition {
    intershipPositionId: string,
    companyId: number,
    companyName: string,
    intershipPositionName: string,
    intershipPositionCount: number,
}

export interface IStudent {
    email: string,
    firstName: string,
    lastName: string,
    patronym: string,
    role: string,
    userId: string,
};
