// Sursa:
// https://www.youtube.com/watch?v=YeFzkC2awTM&t=1736s&ab_channel=WebDevSimplified

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove')
    for(var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButons = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addToCartButons.length; i++){
        var button = addToCartButons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('cumpara')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
    alert('Comanda dumneavoastra a fost Inregistrata')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartItems = cartItemContainer.getElementsByClassName('cart-item')
    var total = 0
    for(var i = 0; i < cartItems.length; i++){
        var cartItem = cartItems[i]
        var priceElement = cartItem.getElementsByClassName('cartItemPrice')[0]
        var quantityElement = cartItem.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace(' RON', ''))
        var quantity = quantityElement.value
        total = total + (price*quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' RON'
}

var addToCartButons = document.getElementsByClassName('shop-item-button')
for (var i=0; i < addToCartButons.length; i++){
    var button = addToCartButons[i]
    button.addEventListener('click', addToCartClicked)
}



function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title =shopItem.getElementsByClassName('itemTitle')[0].innerText
    var price =shopItem.getElementsByClassName('itemPrice')[0].innerText.replace(' RON', '')
    var image =shopItem.getElementsByClassName('itemImage')[0].src
    addItemToCart(title, price, image)
    updateCartTotal()
}

function addItemToCart(title, price, image) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-item')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cartItemTitle')
    for( var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title) {
            alert('Ati adaugat deja acest obiect in cosul de cumparaturi')
            return
        }
    }
    var cartRowContent=
    `<div class="cartItemImage">
        <img src="${image}" alt="">
        <span class="cartItemTitle">${title}</span>
    </div>
    <div class="cartItemPrice">
        <span>${price} RON</span>
    </div>
    <div class="cart-quantity">
        <input class="cart-quantity-input" type="number" value ="1">
        <button class="remove" type="button">Sterge</button>
    </div>
    </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}