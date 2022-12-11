import * as dotenv from 'dotenv'
dotenv.config()

export const Config = {
    WebHost: process.env.HOSTNAME ?? 'localhost',
    WebPort: process.env.PORT ?? '3000',
    OAuthClientKey: process.env.OAUTH_CLIENT_KEY ?? '',
    OAuthClientSecret: process.env.OAUTH_CLIENT_SECRET ?? ''
}