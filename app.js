// Array onde os alunos ficam armazenados
const alunos = [];

// Elemento principal da aplicação
const app = document.querySelector("#app");

// Botões do menu
const botoesMenu = document.querySelectorAll("nav button");


// Marca o botão atual do menu
function marcarMenuAtivo(rota) {

    botoesMenu.forEach(botao => {

        botao.classList.toggle(
            "ativo",
            botao.dataset.rota === rota
        );

    });

}


// Controla a navegação da SPA
function irPara(rota) {

    marcarMenuAtivo(rota);

    if (rota === "inicio") {
        mostrarInicio();
    }

    if (rota === "cadastro") {
        mostrarCadastro();
    }

    if (rota === "lista") {
        mostrarLista();
    }

    if (rota === "sobre") {
        mostrarSobre();
    }

}


// Tela inicial
function mostrarInicio() {

    app.innerHTML = `

        <h1>Sistema de Notas</h1>

        <p>
            Bem-vindo ao Sistema de Notas.
            Aqui é possível cadastrar alunos,
            informar suas notas e verificar
            automaticamente a situação final.
        </p>

        <div class="contador">

            Alunos cadastrados:
            <strong>${alunos.length}</strong>

        </div>

        <div class="acoes">

            <button class="botao" id="btnCadastrar">
                Cadastrar Aluno
            </button>

            <button class="botao secundario" id="btnVerAlunos">
                Ver Lista de Notas
            </button>

        </div>

    `;


    document
        .querySelector("#btnCadastrar")
        .addEventListener("click", () => {

            irPara("cadastro");

        });


    document
        .querySelector("#btnVerAlunos")
        .addEventListener("click", () => {

            irPara("lista");

        });

}


// Tela de cadastro
function mostrarCadastro() {

    app.innerHTML = `

        <h1>Cadastrar Aluno</h1>

        <p>
            Informe o nome do aluno e suas três notas.
        </p>

        <form id="formAluno">

            <div class="campo">

                <label for="nome">
                    Nome do aluno
                </label>

                <input
                    id="nome"
                    type="text"
                    placeholder="Digite o nome do aluno"
                    required
                >

            </div>


            <div class="campo">

                <label for="nota1">
                    Nota 1
                </label>

                <input
                    id="nota1"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="Digite a primeira nota"
                    required
                >

            </div>


            <div class="campo">

                <label for="nota2">
                    Nota 2
                </label>

                <input
                    id="nota2"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="Digite a segunda nota"
                    required
                >

            </div>


            <div class="campo">

                <label for="nota3">
                    Nota 3
                </label>

                <input
                    id="nota3"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="Digite a terceira nota"
                    required
                >

            </div>


            <button
                class="botao"
                type="submit"
            >
                Cadastrar Aluno
            </button>


            <div id="mensagem"></div>

        </form>

    `;


    document
        .querySelector("#formAluno")
        .addEventListener("submit", function(evento) {

            evento.preventDefault();


            const nome =
                document
                .querySelector("#nome")
                .value
                .trim();


            const nota1 =
                Number(
                    document.querySelector("#nota1").value
                );


            const nota2 =
                Number(
                    document.querySelector("#nota2").value
                );


            const nota3 =
                Number(
                    document.querySelector("#nota3").value
                );


            // Calcula a média
            const media =
                (nota1 + nota2 + nota3) / 3;


            // Define a situação
            let situacao;


            if (media >= 7) {

                situacao = "Aprovado";

            } else if (media >= 5) {

                situacao = "Recuperação";

            } else {

                situacao = "Reprovado";

            }


            // Adiciona o aluno ao array
            alunos.push({

                nome: nome,

                nota1: nota1,

                nota2: nota2,

                nota3: nota3,

                media: media,

                situacao: situacao

            });


            // Mostra mensagem
            document.querySelector("#mensagem").innerHTML = `

                <div class="mensagem">

                    Aluno cadastrado com sucesso!

                    <br>

                    Média:
                    <strong>${media.toFixed(2)}</strong>

                    <br>

                    Situação:
                    <strong>${situacao}</strong>

                </div>

            `;


            // Limpa o formulário
            evento.target.reset();

        });

}


// Tela de lista
function mostrarLista() {

    app.innerHTML = `

        <h1>Lista de Notas</h1>

        <p>
            Confira as notas, médias e situações
            dos alunos cadastrados.
        </p>

        <div id="conteudoLista"></div>

    `;


    renderizarTabela();

}


// Cria a tabela dinamicamente
function renderizarTabela() {

    const conteudo =
        document.querySelector("#conteudoLista");


    // Se não houver alunos
    if (alunos.length === 0) {

        conteudo.innerHTML = `

            <div class="vazio">

                Nenhum aluno cadastrado ainda.

            </div>

        `;

        return;

    }


    let linhas = "";


    alunos.forEach((aluno, indice) => {

        linhas += `

            <tr>

                <td>
                    ${aluno.nome}
                </td>

                <td>
                    ${aluno.nota1.toFixed(1)}
                </td>

                <td>
                    ${aluno.nota2.toFixed(1)}
                </td>

                <td>
                    ${aluno.nota3.toFixed(1)}
                </td>

                <td>
                    ${aluno.media.toFixed(2)}
                </td>

                <td>
                    ${aluno.situacao}
                </td>

                <td>

                    <button
                        class="excluir"
                        data-indice="${indice}"
                    >
                        Excluir
                    </button>

                </td>

            </tr>

        `;

    });


    conteudo.innerHTML = `

        <div class="tabela-container">

            <table>

                <thead>

                    <tr>

                        <th>Aluno</th>

                        <th>Nota 1</th>

                        <th>Nota 2</th>

                        <th>Nota 3</th>

                        <th>Média</th>

                        <th>Situação</th>

                        <th>Ação</th>

                    </tr>

                </thead>


                <tbody>

                    ${linhas}

                </tbody>

            </table>

        </div>

    `;


    // Botões de excluir
    document
        .querySelectorAll(".excluir")
        .forEach(botao => {

            botao.addEventListener("click", function() {

                const indice =
                    Number(this.dataset.indice);


                alunos.splice(indice, 1);


                renderizarTabela();

            });

        });

}


// Tela Sobre
function mostrarSobre() {

    app.innerHTML = `

        <h1>Sobre o projeto</h1>

        <div class="card">

            <p>
                Este projeto é uma SPA simples
                desenvolvida com HTML, CSS e JavaScript.
            </p>

            <p>
                O sistema permite cadastrar alunos,
                informar três notas, calcular a média
                e apresentar a situação do aluno.
            </p>

            <p>
                Os dados ficam armazenados
                temporariamente em um array JavaScript.
            </p>

            <p>
                A navegação entre as telas acontece
                sem recarregar a página.
            </p>

        </div>

    `;

}


// Eventos dos botões do menu
botoesMenu.forEach(botao => {

    botao.addEventListener("click", () => {

        irPara(botao.dataset.rota);

    });

});


// Abre a tela inicial
mostrarInicio();