function pegarSenha(tag_email, tag_senha) {
    let emailInp = document.querySelector(tag_email);
    let senhaInp = document.querySelector(tag_senha);

    console.log(emailInp.value)
    console.log(senhaInp.value)

    emailInp_value = emailInp.value
    senhaInp_value = senhaInp.value

    async function enviar() {
        const resposta = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify({ emailInp_value, senhaInp_value })
            
        });

        
    }
    
    enviar()
    console.log("funcionou!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")  
    emailInp.value = "";
    senhaInp.value = "";
}