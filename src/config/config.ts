import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export interface AppConfig {
    port: string;
}

const config: AppConfig =
{
    port: process.env.PORT ?? ''
}

export { config }