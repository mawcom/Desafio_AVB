function pegarSenha(tag_email, tag_senha) {
    let emailInp = document.querySelector(tag_email);
    let senhaInp = document.querySelector(tag_senha);

    console.log(emailInp.value)
    console.log(senhaInp.value)

    emailInp.value = "";
    senhaInp.value = "";


}
    
    
