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

export interface LogBody {
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

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface LogResponse extends Log {
  id: number;
  isFavorite: boolean;
}

export interface CreateLogResponse extends LogResponse {
  user: User;
}

export interface UpdateLogResponse extends LogResponse {
  user: User;
}

export interface GetLogDetailResponse extends LogResponse {
  user: User;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface GetLogsResponse {
  content: LogResponse[];
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

export interface ToggleLogFavoriteRepsonse extends LogResponse {
  user: User;
}

export interface CreateLogImagesResponse extends LogResponse {
  user: User;
}
