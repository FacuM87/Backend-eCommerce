import dotenv from "dotenv"

dotenv.config()

const config = {
    port: process.env.PORT || 8080,
    amdinUserName: process.env.ADMIN_USER,
    adminPassword: process.env.ADMIN_PASSWORD,
    mongoUrl: process.env.MONGO_URL,
    mongoDB: process.env.MONGO_DB,
    sessionSecret: process.env.SESSION_SECRET,
    jwtSign: process.env.JWT_SIGN,
    environment: process.env.ENVIRONMENT,
    mailService: process.env.MAIL_SERVICE,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailPort: process.env.MAIL_PORT,
    stripeKey: process.env.STRIPE_KEY,
    persistence: process.env.PERSISTENCE,
    deployUrl: process.env.DEPLOY
}

if (config.environment === 'dev') {
    config.url = `http://localhost:${config.port}`
    config.githubClientId = process.env.GITHUB_CLIENT_ID
    config.githubClientSecret = process.env.GITHUB_CLIENT_SECRET
    config.githubClientCallback = process.env.GITHUB_CLIENT_CALLBACK
} else {
    config.url = config.deployUrl;
    config.githubClientId = process.env.PROD_GITHUB_CLIENT_ID
    config.githubClientSecret = process.env.PROD_GITHUB_CLIENT_SECRET
    config.githubClientCallback = process.env.PROD_GITHUB_CLIENT_CALLBACK
}

export default config;