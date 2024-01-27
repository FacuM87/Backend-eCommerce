import dotenv from "dotenv"

dotenv.config()

export default {
    port: process.env.PORT,
    amdinUserName: process.env.ADMIN_USER,
    adminPassword: process.env.ADMIN_PASSWORD,
    mongoUrl: process.env.MONGO_URL,
    mongoDB: process.env.MONGO_DB,
    sessionSecret: process.env.SESSION_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    githubClientCallback: process.env.GITHUB_CLIENT_CALLBACK

}