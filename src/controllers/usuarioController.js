var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            foto: resultadoAutenticar[0].foto
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var foto = req.body.fotoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (foto == undefined) {
        res.status(400).send("Sua foto está undefined!")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, foto)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscar(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        usuarioModel.buscar(id).then(
            function (resultadoBuscar) {
                console.log(`\nResultados encontrados: ${resultadoBuscar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoBuscar)}`);

                if (resultadoBuscar.length == 1) {
                    res.json({
                        id: resultadoBuscar[0].id,
                        email: resultadoBuscar[0].email,
                        nome: resultadoBuscar[0].nome,
                        foto: resultadoBuscar[0].foto
                    });
                } else if (resultadoBuscar.length == 0) {
                    res.status(404).send("Usuário não encontrado");
                } else {
                    res.status(500).send("Mais de um usuário com o mesmo id!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar o usuário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

    }
}


function atualizarNome(req, res) {
    var id = req.params.id;
    var nome = req.body.nome;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else {
        usuarioModel.atualizarNome(id, nome).then(
            function (resultadoNome) {
                res.sendStatus(200);
                console.log('Nome alterado com sucesso!');
            }).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function atualizarEmail(req, res) {
    var id = req.params.id;
    var email = req.body.email;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        usuarioModel.atualizarEmail(id, email).then(
            function (resultadoEmail) {
                res.sendStatus(200);
                console.log('Email alterado com sucesso!');
            }).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}


function atualizarSenha(req, res) {
    var id = req.params.id;
    var senha = req.body.senha;

    if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.atualizarSenha(id, senha).then(
            function (resultadoSenha) {
                res.sendStatus(200);
                console.log('Senha alterada com sucesso!');
            }).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function atualizarFoto(req, res) {
    var id = req.params.id;
    var foto = req.body.foto;

    if (foto == undefined) {
        res.status(400).send("Sua foto está undefined!");
    } else {
        usuarioModel.atualizarFoto(id, foto).then(
            function (resultadoFoto) {
                res.sendStatus(200);
                console.log('Foto alterada com sucesso!');
            }).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function excluir(req, res) {
    var id = req.params.id;

    usuarioModel.excluir(id).then(function (resultadoExcluir) {
        res.sendStatus(200);
        console.log('Usuário excluído com sucesso!');
    }).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

module.exports = {
    autenticar,
    cadastrar,
    listar,
    buscar,
    atualizarNome,
    atualizarEmail,
    atualizarSenha,
    atualizarFoto,
    excluir
}