export interface ServerInterface {
    port: number;
    prefix: string
}

export const config: ServerInterface = {
    port: Number(process.env['SERVER_PORT'] || 5500),
    prefix: String(process.env['PREFIX'] || '/inotavault/vi/api')
}
