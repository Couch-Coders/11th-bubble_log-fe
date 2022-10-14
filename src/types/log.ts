export interface Log {
  date: string;
  diveType: string;
  enterTime: string;
  leaveTime: string;
  sight: number;
  maxDepth: number;
  temperature: number;
  minOxygen: number;
  maxOxygen: number;
  location: string;
  content: string;
  images: string[];
  latitude: number;
  longitude: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface LogWithId extends Log {
  id: number;
}

export interface CreateLogBody {
  date: string;
  diveType: string;
  enterTime: string;
  leaveTime: string;
  sight: number;
  maxDepth: number;
  temperature: number;
  minOxygen: number;
  maxOxygen: number;
  location: string;
  content: string;
  latitude: number;
  longitude: number;
}

export interface CreateLogResponse extends LogWithId {
  user: User;
  isFavorite: boolean;
}

export type UpdateLogBody = Log;

export interface UpdateLogResponse extends LogWithId {
  user: User;
  isFavorite: boolean;
}

export interface GetLogDetailResponse extends LogWithId {
  user: User;
  isFavorite: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface GetLogsResponse {
  contents: LogWithId[];
  pageable: {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  last: boolean;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface GetLogsQuery {
  startDate: string;
  endDate: string;
  diveType: string;
  location: string;
  minTemperature: string;
  maxTemperature: string;
  minDepth: string;
  maxDepth: string;
  keyword: string;
  page: string;
  size: string;
  orderBy: string;
}

export interface ToggleLogFavoriteRepsonse extends LogWithId {
  user: User;
  isFavorite: boolean;
}

export interface CreateLogImagesBody {
  formData: FormData;
}

export interface CreateLogImagesResponse extends LogWithId {
  user: User;
  isFavorite: boolean;
}
