type PaginatedApiResponse<T> = {
    data: T[];
    meta: PaginatedMeta;
};

type PaginatedMeta = {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type {PaginatedApiResponse, PaginatedMeta};
