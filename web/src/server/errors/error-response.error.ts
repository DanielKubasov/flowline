type ErrorResponsePayload = {
    statusCode: number;
    message: string;
    error: string;
    stacktrace?: string | undefined;
};

class ErrorResponse extends Error {
    public statusCode: number;
    public message: string;
    public error: string;
    public stacktrace?: string;

    public constructor(data: ErrorResponsePayload) {
        super();
        this.statusCode = data.statusCode;
        this.message = data.message;
        this.error = data.error;
        this.stacktrace = data.stacktrace;
    }
}

export {ErrorResponse};
