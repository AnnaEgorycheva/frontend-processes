export type PracticePeriodGroupType = {
    groupNumber: string
}

export type SelectOptionType = {
    value: string,
    label: string
}

export type GroupType = {
    groupNumber: string,
    students: Array<UserDtoType>
}

export type PracticePeriod = {
    id: string,
    startDate: string,
    endDate: string,
    practiceOrder: string | null,
    practicePeriodName: string | null,
    groups?: Array<PracticePeriodGroupType> | null
}
export type PracticePeriodInfo = {
    id: string,
    practicePeriodName: string | null 
}
export type PracticePeriodCreateUpdate = {
    startDate: string,
    endDate: string,
    practiceOrder: string | null,
    practicePeriodName: string | null,
    groups?: Array<PracticePeriodGroupType> | null
}

export type PracticeProfile = {
    practiceProfileId: string,
    userId: string,
    companyId: string | null,
    position: string | null,
    characteristic: string | null,
    practiceDiary: string | null,
    practicePeriodId: string
}
export type PracticePeriodAndStudentPracticeProfile = {
    startDate: string,
    endDate: string,
    practicePeriodName: string | null,
    practiceProfileId: string
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
    intershipApplicationsCount: number | string
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

export type InterviewDtoType = {
    date: string,
    id:	string,
    location?: string
}

export type ApplicationDtoType = {
    id:	string,
    interviews:	Array<InterviewDtoType>,
    positionId:	string,
    status:	Array<string>,
    studentId: string,
    firstName?: string,
    lastName?: string,
    patronym?: string,
    companyName?: string,
    intershipPositionName?: string,
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
    patronym?: string,
    role: string,
    userId: string,
    groupNumber: string;
    companyId?: string;
    position?: string;
    companyName?: string;
};

export interface IPeriod {
    practicePeriodName: string;
    startDate: string;
    endDate: string;
    practiceProfileId: string;
};

export interface IApplication {
    id: string;
    interviews: [
        {
            date: string;
            id: string;
            location: string;
        }
    ],
    positionId: string;
    status: [ string ],
    studentId: string;
    companyName: string;
    position: string;
};