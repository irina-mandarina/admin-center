
import { JobType } from '~/objects/jobType'
import { StatusType } from '~/objects/statusType'
import { ResourceType } from '~/objects/resourceType'

export interface Job {
    id: string,
    name: string,
    type: JobType,
    owner: string,
    resource: ResourceType,
    date: string,
    status: StatusType,
    [key: string]: string | undefined | JobType | ResourceType | StatusType
}