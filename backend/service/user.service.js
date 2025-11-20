import pool from "../config/db.js"
import hashUtils from "../utils/hash.js"
import tokenUtils from "../utils/token.js"


const { generateToken } = tokenUtils
const { hashPassword, comparePassword } = hashUtils;


export default {
    async register({ email, senha, nome }) {
        try {
            const senhaCrip = await hashPassword(senha)
            const query = `INSERT INTO usarios (email, senha, nome) VALUES ($1, $2, $3) RETURNING *`
            const values = [email, senhaCrip, nome];
            const { rows } = await pool.query(query, values)
            const user = rows[0];
            const token = generateToken({email: user.email, nome:user.nome, id: user.id})
            return {user,token} 

        } catch (error) {
            console.log(error)
            return false
        }
    },
    async login({ email, senha }) {
        try {
            
            const query = `SELECT * FROM usarios WHERE email = $1`
            const values = [email];

            console.log("query:::::::::", query, values)

            const { rows } = await pool.query(query, values)
            const user = rows[0];
            console.log("RESPOSTA DA QUERRY", user)

            const validade = await comparePassword(senha, user.senha)

            if (rows.length === 0) {
                return false;
            }
            if (validade){
                const token = generateToken({email: user.email, nome:user.nome, id: user.id})
                console.log(token)
                return {user,token} 

            }


        } catch (error) {
            console.log(error)
            return false

        }
    }
}