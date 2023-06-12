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
