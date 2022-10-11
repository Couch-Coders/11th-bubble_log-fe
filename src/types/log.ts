export interface Log {
  userId: number
  date: Date
  diveType: string
  enterTime: Date
  leaveTime: Date
  sight: number
  maxDepth: number
  temperature: number
  maxOxygen: number
  minOxygen: number
  location: string
  content: string
  images: string[]
  latitude: number
  longitude: number
}

export interface LogWithId extends Log {
  id: number
}

export type CreateLogBody = Log

export type CreateLogResponse = LogWithId

export type UpdateLogBody = Log

export type UpdateLogResponse = LogWithId

export type GetLogDetailResponse = LogWithId

interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface GetLogsResponse {
  contents: LogWithId[]
  pageable: {
    sort: Sort
    offset: number
    pageNumber: number
    pageSize: number
    unpaged: boolean
    paged: boolean
  }
  totalElements: number
  last: boolean
  totalPages: number
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  first: boolean
  empty: boolean
}

export interface GetLogsQuery {
  startDate: string
  endDate: string
  diveType: string
  location: string
  minTemperature: string
  maxTemperature: string
  minDepth: string
  maxDepth: string
  keyword: string
  page: string
  size: string
  orderBy: string
}
