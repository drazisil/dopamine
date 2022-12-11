import * as dotenv from 'dotenv'
dotenv.config()

export const Config = {
    WebPort: process.env.PORT ?? '3000'
}