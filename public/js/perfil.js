// carrega os dados na tela (navbar, card e campos)
function carregarPerfil() {
    var foto = sessionStorage.FOTO_USUARIO;
    var caminhoFoto = foto
        ? "../assets/perfil/" + foto
        : "../assets/perfil/peao_pixelart.svg";

    // mostra primeiro o que está na sessão (aparece rápido)
    b_foto.src = caminhoFoto;
    perfilFoto.src = caminhoFoto;
    b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
    perfilNome.innerHTML = "@" + sessionStorage.NOME_USUARIO;

    // depois busca o dado real no banco
    fetch(`/usuarios/${idUsuario}/nome`)
        .then(function (resposta) {
            resposta.json().then(function (usuario) {
                ipt_nome.value = usuario.nome;
                ipt_email.value = usuario.email;
                perfilNome.innerHTML = "@" + usuario.nome;
                b_usuario.innerHTML = usuario.nome;

                nomeOriginal = usuario.nome;
                emailOriginal = usuario.email;

                // mantém a sessão igual ao banco
                sessionStorage.NOME_USUARIO = usuario.nome;
                sessionStorage.EMAIL_USUARIO = usuario.email;
                sessionStorage.FOTO_USUARIO = usuario.foto;

                var caminho = "../assets/perfil/" + usuario.foto;
                b_foto.src = caminho;
                perfilFoto.src = caminho;
            });
        })
        .catch(function (erro) {
            console.log(erro);
        });
}