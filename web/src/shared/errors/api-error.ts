class ApiError extends Error {
    public statusCode: number;
    public message: string;

    public constructor(message?: string, statusCode?: number) {
        super();
        this.statusCode = statusCode || 500;
        this.message = message || 'Internal server error';
    }
}

export {ApiError};
