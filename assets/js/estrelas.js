//***  ---  Data Initial  ---  ***
let userLogado = JSON.parse(localStorage.getItem("userLogado"));
let logado = document.querySelector("#logado");

let nomeCima = document.querySelector("#cad-log");
let estrelasCima = document.querySelector("#cad-estrelas");

let deposito = document.getElementsByClassName("deposito");
let compra = document.getElementsByClassName("compra");

let btnAdicionar = document.getElementsByClassName("adicionar")[0];
let btnReduzir = document.getElementsByClassName("reduzir")[0];

let { Estrelas } = JSON.parse(localStorage.getItem("userLogado"));
let { user } = JSON.parse(localStorage.getItem("userLogado"));
let listaUser = JSON.parse(localStorage.getItem("listaUser"));

//console.log(valorInicial)
//const index = listaUser.findIndex(user => user.value == valorInicial)
//let valornovo = (listaUser[index].valorInicial = Estrelas)
//const NewStarUser = {...ListaUser, valorInicial:valornovo}

//***  ---  Events Main  ---  ***
btnAdicionar.addEventListener("click", encontrarUsuario());

btnReduzir.addEventListener("click", encontrarUsuario());


//***  ---  Functions  ---  ***

//**** function encontrar usuario
function encontrarUsuario() {
  ///***  ---
  for (var i = 0; i < listaUser.length; i++) {
    ///***  
    let [{ valorInicial }] = JSON.parse(localStorage.getItem("listaUser"));
    let lista = listaUser[i];
    let valorCheio = lista.valorInicial;
    let achei = userLogado.nome === lista.nomeCad;

    ///*** 
    console.log(achei, valorCheio, lista);

    if (userLogado.nome === lista.nomeCad) {
      ///***  
      valorCheio = (lista.valorInicial = Estrelas);

      ///***  
      const NewStarUser = [...listaUser];

      ///***  
      localStorage.setItem("listaUser", JSON.stringify(NewStarUser));
      console.log(NewStarUser);

      return;

    } else {
      ///*** 
      console.log("false", valorInicial);
    }
  }
}
//**** -----------


//**** function sair
function sair() {
  ///***  ---
  encontrarUsuario();

  ///***  ---
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");

  ///***  ---
  window.location.href = "./login.html";
}
//**** -----------


//**** function capturar soma
function capturarSoma() {
  ///***  ---
  let { Estrelas } = JSON.parse(localStorage.getItem("userLogado"));
  capturarValor = document.getElementById("deposito").value;
  somaTotal = parseInt(capturarValor) + Estrelas;

  ///***  ---
  if (somaTotal < Estrelas) {
    //***
    alert("Não é possivel usar valores negativos!");

  } else if (capturarValor == "") {
    //***
    alert("insira um valor!");

  } else {
    //***
    const NewStarUser = {
      ...userLogado,
      Estrelas: somaTotal
    };

    //***
    localStorage.setItem("userLogado", JSON.stringify(NewStarUser));

    //***
    estrelasCima.innerHTML = NewStarUser + "★";
    console.log(NewStarUser);

    window.location.href = "./estrelas.html";
  }

  //***
  encontrarUsuario();
}
//**** -----------


//**** function capturar soma
function capturarSaque() {
  ///***  ---
  let { Estrelas } = JSON.parse(localStorage.getItem("userLogado"));
  capturarValor = document.getElementById("saque").value;
  somaTotal = Estrelas - parseInt(capturarValor);

  ///***  ---
  if (capturarValor === "") {
    //***
    alert("insira um valor!");

  } else if (capturarValor <= 0) {
    //***
    alert("Não é possivel usar valores negativos!");

  } else if (somaTotal < 0) {
    //***
    alert("Saldo insuficiente!");

    return;

  } else {
    //***
    const NewStarUser = {
      ...userLogado,
      Estrelas: somaTotal
    };

    //***
    localStorage.setItem("userLogado", JSON.stringify(NewStarUser));
    estrelasCima.innerHTML = NewStarUser + "★";

    //***
    console.log(NewStarUser);

    window.location.href = "./estrelas.html";
  }

  //***
  encontrarUsuario();
}
//**** -----------


//**** function inut value
function inputValue(event) {
  ///***  ---
  var input = event.target;
}
//**** -----------


//***  ---  Work in starts and user  ---  ***

///***  ---
nomeCima.innerHTML = userLogado.nome;
estrelasCima.innerHTML = userLogado.Estrelas + "★";

///***  ---
if (localStorage.getItem("token") === null) {
  //***  
  alert("Você precisa estar logado!");
  window.location.href = "./login.html";
}

//document.getElementsByClassName("adicionar")[0].addEventListener("click", inputValue)

///***  ---
var capturarValor = "";


