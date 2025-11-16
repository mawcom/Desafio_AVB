import dotenv from "dotenv"
dotenv.config();

import ptg from "pg"

const { Pool } = ptg;

const pool = new Pool({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

export default pool