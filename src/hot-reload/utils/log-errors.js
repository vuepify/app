export function logErrors(execute) {
    try {
        return execute();
    } catch (error) {
        console.error(error);
    }
}

export function withErrorLogger(execute) {
    return (...args) => logErrors(() => execute(...args));
}
