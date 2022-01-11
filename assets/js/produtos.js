if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger")
    console.log(removeCartItemButtons)

    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem)

    }
    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('botao_compre')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCartClick)
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked)
}


function purchaseClicked() {
    alert("Cadastre-se para realizar uma compra!")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function addToCartClick(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("texto_nome")[0].innerText
    var price = shopItem.getElementsByClassName("price")[0].innerText
    var imgSrc = shopItem.getElementsByClassName("shopIMG")[0].src
    addItemToCart(title, price, imgSrc)
    updateCartTotal()
}


function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement("div")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemsName = document.getElementsByClassName("cart-item-title")
    for (var i = 0; i < cartItemsName.length; i++) {
        if (cartItemsName[i].innerText == title) {
            alert("Você ja adicionou esse item!")
            return;
        }
    }

    cartRow.classList.add("cart-row")
    var cartRowContents = `
        <div class="cart-item cart-colum">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        </div>
        <span class="cart-item-title">${title}</span>
        <span class="cart-price cart-colum">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVER</button>
        </div>
    `;

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]

        var price = parseFloat(priceElement.innerText.replace("★", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = total + "★"
    console.log(total)
}
