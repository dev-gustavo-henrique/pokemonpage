//***  ---  Data Initial  ---  ***
let userLogado = JSON.parse(localStorage.getItem("userLogado"));
let logado = document.querySelector("#logado");

let nomeCima = document.querySelector("#cad-log");
let estrelasCima = document.querySelector("#cad-estrelas");

let btnPurchase = document.getElementsByClassName("btn-purchase")[0];

///*** 
console.log(userLogado.Estrelas);

///*** 
listaUser = JSON.parse(localStorage.getItem("listaUser"));
nomeCima.innerHTML = userLogado.nome;
estrelasCima.innerHTML = userLogado.Estrelas + "★";

///*** 
btnPurchase.addEventListener("click", purchaseClicked);

///*** 
if (localStorage.getItem("token") === null) {
    alert("Você precisa esta logado!");

    window.location.href = "./login.html";
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


//***  ---  Functions  ---  ***

//**** function sair
function sair() {
    ///*** 
    encontrarUsuario();

    ///*** 
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");

    ///*** 
    window.location.href = "./login.html";
}
//**** -----------


//**** function read
function ready() {
    ///*** 
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    var addToCartButtons = document.getElementsByClassName('botao_compre');
    console.log(removeCartItemButtons);

    ///*** 
    removeCartItemButtons.forEach((index) => {
        var button = removeCartItemButtons[index];
        button.addEventListener("click", removeCartItem);
    });

    ///*** 
    quantityInputs.forEach((index) => {
        var input = quantityInputs[index];
        input.addEventListener("change", quantityChanged);
    });

    ///*** 
    addToCartButtons.forEach((index) => {
        var button = addToCartButtons[index];
        button.addEventListener("click", addToCartClick);
    });
}
//**** -----------


//**** function purchase clicked
function purchaseClicked(total) {
    ///*** 
    let {
        Estrelas
    } = JSON.parse(localStorage.getItem("userLogado"));

    ///*** 
    if (Estrelas < updateCartTotal()) {
        alert("quantidade de estrelas insuficientes!");

        return;
    } else {
        alert("Compra realizada com sucesso!");

        const cartTotal = updateCartTotal();

        updateStar(cartTotal);
    }
    ///*** 
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }

    ///*** 
    encontrarUsuario();
    updateCartTotal();
}
//**** -----------


//**** function add to card click
function addToCartClick(event) {
    ///*** 
    var button = event.target;
    var shopItem = button.parentElement.parentElement;

    ///*** 
    var title = shopItem.getElementsByClassName("texto_nome")[0].innerText;
    var price = shopItem.getElementsByClassName("price")[0].innerText;
    var imgSrc = shopItem.getElementsByClassName("shopIMG")[0].src;

    ///*** 
    addItemToCart(title, price, imgSrc);

    ///*** 
    updateCartTotal();
}
//**** -----------


//**** function add item to card
function addItemToCart(title, price, imgSrc) {
    ///*** 
    var cartRow = document.createElement("div");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemsName = document.getElementsByClassName("cart-item-title");

    ///*** 
    for (var i = 0; i < cartItemsName.length; i++) {
        if (cartItemsName[i].innerText === title) {
            ///*** 
            alert("Você ja adicionou esse item!");
            return;
        }
    }

    ///*** 
    cartRow.classList.add("cart-row");
    var cartRowContents = () => {
        return (`
            <div class="cart-item cart-colum">
                <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            </div>
            <span class="cart-item-title">${title}</span>
            <span class="cart-price cart-colum">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVER</button>
            </div
        `);
    }

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    ///*** 
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}
//**** -----------


//**** function remove cart item
function removeCartItem(event) {
    ///*** 
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    ///*** 
    updateCartTotal();
}
//**** -----------


//**** function quantity changed
function quantityChanged(event) {
    ///*** 
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    ///*** 
    updateCartTotal();
}
//**** -----------


//**** function update cart total
function updateCartTotal() {
    ///*** 
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;

    ///*** 
    for (var i = 0; i < cartRows.length; i++) {
        ///*** 
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];

        ///*** 
        var price = parseFloat(priceElement.innerText.replace("★", ""));
        var quantity = quantityElement.value;

        ///*** 
        total = total + (price * quantity);
    }
    ///*** 
    total = Math.round(total * 100) / 100;

    ///*** 
    document.getElementsByClassName("cart-total-price")[0].innerText = total + "★";
    return total;
}
//**** -----------
