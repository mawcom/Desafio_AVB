import ptg from "pg";
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import userRotes from "./routes/user.routes.js"

dotenv.config();

const { Pool } = ptg;

const pool = new Pool({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});


const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/user", userRotes)


app.listen(3000, () => console.log("API rodando na porta 3000"));



export default pool