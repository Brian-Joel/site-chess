// Preenche a página de perfil com os dados salvos na sessão.
function carregarPerfil() {
    const nome = sessionStorage.NOME_USUARIO;
    const email = sessionStorage.EMAIL_USUARIO;

    const nomePerfil = document.getElementById("perfilNome");
    const emailPerfil = document.getElementById("perfilEmail");

    if (nomePerfil) {
        nomePerfil.textContent = nome || "Usuário";
    }

    if (emailPerfil) {
        emailPerfil.textContent = email || "E-mail não informado";
    }
}
