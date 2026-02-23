export interface ApiResponse<T = never> {
    data?: T;
    message?: string;
    error?: string;
    statusCode?: number;
    timestamp?: string;
}

export interface SuccessResponse<T = never> extends ApiResponse<T> {
    data: T;
    statusCode: 200 | 201 | 204;
}

export interface ErrorResponse extends ApiResponse {
    error: string;
    statusCode: 400 | 401 | 403 | 404 | 409 | 422 | 500 | 502 | 503;
    details?: any;
}

export interface ApiError {
    message: string;
    error: string;
    statusCode: number;
    timestamp?: string;
    path?: string;
}

export interface ValidationError extends ApiError {
    statusCode: 422;
    details: {
        field: string;
        message: string;
        value?: any;
    }[];
}

export interface PaginationRequest {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse<T = any> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface IdParam {
    id: string | number;
}

export interface DateRange {
    startDate: string;
    endDate: string;
}

export interface QueryParams {
    [key: string]: string | number | boolean | undefined;
}