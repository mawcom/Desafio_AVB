const token = sessionStorage.getItem("token")
console.log(token)

if (!token) {
    alert("token não fornecido")
    window.location.href = "index.html";
} else {

    fetch("http://localhost:3000/user/private", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(async res => {

            // token inválido
            if (res.status === 401 || res.status === 403) {
                alert("Sessão expirada!");
                localStorage.removeItem("token");
                window.location.href = "index.html";
                return;
            }

            return res.json();
        })
        .then(data => {
            if (data.message) {
                document.getElementById("a").innerText =
                    "Se voce está vendo isso, significa que voce teve o acesso permitido a essa página, PARABÉNS"
                document.getElementById("conteudo").innerText =
                    "Conteúdo privado do servidor: " + data.message;


            }

        })
        .catch(err => {
            console.error("Erro:", err);
        });

}


function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

