//***  ---  Data Initial  ---  ***
let btn = document.querySelector("#verSenha");
let btnConfirm = document.querySelector("#verConfirmeSenha");

let senha = document.querySelector("#senha");
let labelSenha = document.querySelector("#labelSenha");

let user = document.querySelector("#user");
let userLabel = document.querySelector("#userLabel");

let senha = document.querySelector("#senha");
let senhaLabel = document.querySelector("#senhaLabel");

let msgError = document.querySelector("#msgError");
let listUser = [];

let userValid = {
    nome: "",
    user: "",
    senha: "",
};


//***  ---  Event Main  ---  ***
btn.addEventListener("click", () => {
    ///***  
    let inputSenha = document.querySelector("#senha");

    ///***  
    setInputPassword(inputSenha);
});


//***  ---  Functions  ---  ***

//**** function entrar
function entrar() {
    ///***  
    handleUser();

    ///***  
    validateUser();
}
//**** -----------


//**** function set input password
function setInputPassword(input) {
    if (input.getAttribute("type") === "password") {
        ///***  
        input.setAttribute("type", "text");
    } else {
        ///***  
        input.setAttribute("type", "password");
    }
}
//**** -----------


//**** function handle user
function handleUser() {
    ///***  
    listUser = JSON.parse(localStorage.getItem("listUser"));

    listUser.forEach((item) => {
        if (
            user.value === item.userCad && senha.value === item.senhaCad
        ) {
            userValid = {
                nome: item.nomeCad,
                user: item.userCad,
                senha: item.senhaCad,
                Estrelas: item.valorInicial
            };
        }
    });
}
//**** -----------


//**** function validate user
function validateUser() {
    if (user.value === userValid.user && senha.value === userValid.senha) {
        ///***  
        window.location.href = "./logugu.html";
        let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);

        ///***  
        localStorage.setItem("token", token);
        localStorage.setItem("userLogado", JSON.stringify(userValid));
    } else {
        ///***  
        setStyleInputAndLabel();

        ///***  
        displayMsgErro("user e ou senha incorretos");
    }
}
//**** -----------


//**** function display menssage error
function displayMsgErro(msg) {
    ///***  
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = `ERROR: ${msg}`;
    
    ///***  
    user.focus();
}
//**** -----------


//**** function set styles in the border-color and color of the input and label
function setStyleInputAndLabel() {
    ///***  
    userLabel.setAttribute("style", "color: red");
    user.setAttribute("style", "border-color: red");

    ///***  
    senhaLabel.setAttribute("style", "color: red");
    senha.setAttribute("style", "border-color: red");
}
//**** -----------
