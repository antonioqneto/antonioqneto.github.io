/* 
GRUPO
ANTONIO
EDMILSON
JONAS
*/


const nomeBusca = document.querySelector(".input");
const mensagemErro = document.querySelector("#mensagemErro");
const botaoBuscar = document.querySelector("#botao_buscar");
const titulo = document.querySelector("#titulo");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const diretor = document.querySelector("#diretor");
const atores = document.querySelector("#atores");
const poster = document.querySelector(".poster");
const sinopse = document.querySelector("#sinopse");
const apiKey = "d25c5757"; // Chave da API
const imgDefault = "./default_image.png";

//Realiza a conexão com a API retornando o Json
async function buscaFilme(nomeBusca) {
     const resposta = await fetch(`https://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`);
     return resposta.json();
}


botaoBuscar.addEventListener("click", () => {
     limparCampos();
     core();
})


//Função para definir e validar os dados do filme
async function core() {
     try {
          mensagemErro.textContent = "";

          const filme = await buscaFilme(nomeBusca.value);
          validaDados(filme);
          defineValores(filme);
     } catch (erro) {
          console.log(erro);
          poster.setAttribute("src", "./img/default_image.png");
          mensagemErro.textContent = `${erro}`;
     }
}

//Função que trata os valores pro HTML
function defineValores(filme) {
     titulo.textContent = filme.Title;
     sinopse.textContent = filme.Plot;
     ano.textContent = `Year: ${filme.Year}`;
     duracao.textContent = `Run time: ${filme.Runtime}`;
     genero.textContent = `Genre: ${filme.Genre}`;
     atores.textContent = `Actors: ${filme.Actors}`;
     diretor.textContent = `Director: ${filme.Director}`;
     poster.setAttribute("src", filme.Poster);

}

//Função para limpar campos quando o botão buscar é pressionado
function limparCampos() {
     titulo.textContent = "";
     sinopse.textContent = "";
     ano.textContent = "";
     duracao.textContent = "";
     genero.textContent = "";
     atores.textContent = "";
     diretor.textContent = "";
     poster.setAttribute("src", imgDefault);

}


//Função de validação dos dados do filme
function validaDados(filme) {
     if (filme.Plot === undefined || filme.Year === undefined || filme.Actors === "N/A") {
          throw new Error("Filme não encontrado!");
     }
}
