export interface IUser {
    id: string
    name: string
    email: string
    title: string
    organization: string
    token: string
}

export interface IProject {
    id: string
    name: string
    personId: string
    pin: boolean
    organization: string
    created: number
}
