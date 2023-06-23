export type UserDtoType = {
    userId: string,
    firstName: string,
    lastName: string,
    patronym?: string | null,
    role: string,
    email: string
}

export type IntershipPositionType = {
    intershipPositionId: string,
    companyId: number | string,
    companyName: string,
    intershipPositionName: string,
    intershipPositionCount: number | string,
}

export type IntersipPositionCreationType = {
    companyId: number | string,
    intershipPositionName: string,
    intershipPositionDescription: string,
    intershipPositionCount: number | string
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
