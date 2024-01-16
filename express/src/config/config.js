import dotenv from "dotenv"

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    mongoDB: process.env.MONGO_DB,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    githubClientCallback: process.env.GITHUB_CLIENT_CALLBACK

}