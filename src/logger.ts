export class Logger {
    private static epoch() {
        return Math.floor(+new Date() / 1000);
    }

    private static writeFile(message: string) {
        Deno.writeTextFile("./discord.log", `${message}\n`, { append: true, create: true })
            .catch(() => { console.error(`(${this.epoch()}) [LOGGING]: There was an error while writing to the logs file!`) });
    }

    private static writeConsole(logFunction: (data: string) => void, message: string) {
        logFunction(message);
    }

    private static format(context: string, message: string): string {
        return `(${this.epoch()}) [${context}]: ${message}`;
    }

    private static write(logFunction: (data: string) => void, message: string) {
        this.writeConsole(logFunction, message);
        this.writeFile(message);
    }

    public static error(context: string, message: string) {
        const logged = this.format(context, message);
        this.write(console.error, logged);
    }

    public static log(context: string, message: string) {
        const logged = this.format(context, message);
        this.write(console.log, logged);
    }
}