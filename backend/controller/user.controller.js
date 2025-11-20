import userService from "../service/user.service.js";



export default {
    async register (req, res)  {
    console.log(req.body)

    try {
        const email = req.body.emailInp_value;
        const senha = req.body.senhaInp_value;
        const nome = req.body.nomeInp_value;

        const result = await userService.register({email, senha, nome})

        return res.json(result)

    } catch (err) {
       return console.log(err)
    }

    return console.log("Recebi do front:", req.body);
}, 


async login (req, res){
    try {
        const email = req.body.emailInp_value;
        const senha = req.body.senhaInp_value;

        const result_search = await userService.login({email,senha});


        console.log("resultado da procura service",result_search)
        console.log("valor do email vindo do input", email)

        if (result_search.user){
            return res.json(result_search)
            console.log("senha valida")

        } else {
            console.log("Nenhum Gmail encontrado ou senha incorreta.");
            return res.json({
                message : "NÃO ENCONTRADO ou SENHA INCORRETA"
        })

        
        }} catch (err) {
            return console.log(err)
        }

    return console.log("Recebi do front:", req.body);



}

}