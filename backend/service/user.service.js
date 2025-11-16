import pool from "../config/db.js"

export default {
    async register({ email, senha, nome }) {
        try {
            const query = `INSERT INTO usarios (email, senha, nome) VALUES ($1, $2, $3) RETURNING *`
            const values = [email, senha, nome];
            const { rows } = await pool.query(query, values)
            const user = rows[0];

            return user

        } catch (error) {
            console.log(error)
            return false
        }
    },
    async login({ email }) {
        try {
            const query = `SELECT * FROM usarios WHERE email = $1`
            const values = [email];
            const { rows } = await pool.query(query, values)
            const user = rows[0];
            console.log(email)

            if (rows.length === 0) {
                return false;
            }

            return user

        } catch (error) {
            console.log(error)
            return false

        }
    }
}