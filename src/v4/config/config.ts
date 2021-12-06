import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export interface AppConfig {
    port: string;
    fileStorePath: string;
}

const config: AppConfig =
{
    port: process.env.PORT ?? '',
    fileStorePath: process.env.FILE_STORE_PATH ?? ''
}

export { config }