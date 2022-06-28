export interface IUser {
    id: string
    name: string
    email: string
    title: string
    organization: string
}

export interface IProject {
    id: string
    name: string
    personId: string
    pin: boolean
    organization: string
}
