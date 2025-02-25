declare class Logger {
    private logFilePath;
    constructor();
    private ensureLogFileExists;
    private getCallerInfo;
    private logMessage;
    info(message: string, track?: string): void;
    warn(message: string, track?: string): void;
    error(message: string, track?: string, error?: string): void;
}

export { Logger };
