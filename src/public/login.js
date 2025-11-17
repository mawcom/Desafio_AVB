function pegarSenha(tag_email, tag_senha) {
    let emailInp = document.querySelector(tag_email);
    let senhaInp = document.querySelector(tag_senha);


    emailInp_value = emailInp.value
    senhaInp_value = senhaInp.value

    async function enviar() {
        try {

            const envio = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ emailInp_value, senhaInp_value })

            });

            if (envio.ok) {
                    const data = await envio.json();
                    console.log(data)
                    sessionStorage.setItem('token', data.token);
                    console.log(sessionStorage.getItem('token'))
                    console.log(data);
                    alert('Registro bem-sucedido! Token armazenado.');

                    
                  } else {
                    alert('Erro no registro.');
                }
            
        } catch (error) {

        }
        

        


    }

    enviar()

    emailInp.value = "";
    senhaInp.value = "";
}