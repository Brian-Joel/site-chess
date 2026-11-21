// Preenche a página de perfil com os dados salvos na sessão.
function carregarPerfil() {
    const nome = sessionStorage.NOME_USUARIO;
    const email = sessionStorage.EMAIL_USUARIO;
    const foto = sessionStorage.FOTO_USUARIO;

    const nomePerfil = document.getElementById("perfilNome");
    const emailPerfil = document.getElementById("perfilEmail");
    const fotoPerfil = document.getElementById("perfilFoto");

    if (nomePerfil) {
        nomePerfil.textContent = nome || "Usuário";
    }

    if (emailPerfil) {
        emailPerfil.textContent = email || "E-mail não informado";
    }

    if (fotoPerfil) {
        fotoPerfil.src = foto
            ? "../assets/perfil/" + foto
            : "../assets/perfil/peao_pixelart.svg";
    }
}
