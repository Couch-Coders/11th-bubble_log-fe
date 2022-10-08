interface Log {
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

interface LogWithId extends Log {
  id: number
}

type CreateLogBody = Log

type CreateLogResponse = LogWithId

type UpdateLogBody = Log

type UpdateLogResponse = LogWithId

type GetLogDetailResponse = LogWithId

interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

interface GetLogsResponse {
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

interface GetLogsQuery {
  date?: string
  type?: string
  location?: string
  depth?: string
  temperature?: string
  favorite?: string
  keyword?: string
}
