interface Job {
    id: string,
    name: string,
    type: JobType,
    owner: string,
    resource: ResourceType,
    date: string,
    status: StatusType,
    [key: string]: string | undefined
}