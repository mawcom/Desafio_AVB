
function pegarSenha(tag_email, tag_senha, tag_nome) {


    let emailInp = document.querySelector(tag_email);
    let senhaInp = document.querySelector(tag_senha);
    let nomeInp = document.querySelector(tag_nome);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInp.value)) {
        console.log("Digite um e-mail válido!");
        emailInp.value = "";
        senhaInp.value = "";
        nomeInp.value = "";
        return;
    }

    else {
        console.log(emailInp.value)
        console.log(senhaInp.value)

        emailInp_value = emailInp.value
        senhaInp_value = senhaInp.value
        nomeInp_value = nomeInp.value

        async function enviar() {
            try {
                const envio = await fetch("http://localhost:3000/user/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ emailInp_value, senhaInp_value, nomeInp_value })
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
        console.log("funcionou!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        emailInp.value = "";
        senhaInp.value = "";
        nomeInp.value = "";
    }

}


