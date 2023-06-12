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
