if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('remove')
    for(let i = 0; i < removeCartItemButtons.length; i++){
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButons = document.getElementsByClassName('shop-item-button')
    for(let i = 0; i < addToCartButons.length; i++){
        let button = addToCartButons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('cumpara')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
    alert('Comanda dumneavoastra a fost Inregistrata')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartItems = cartItemContainer.getElementsByClassName('cart-item')
    let total = 0
    for(let i = 0; i < cartItems.length; i++){
        let cartItem = cartItems[i]
        let priceElement = cartItem.getElementsByClassName('cartItemPrice')[0]
        let quantityElement = cartItem.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace(' RON', ''))
        let quantity = quantityElement.value
        total = total + (price*quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' RON'
}

let addToCartButons = document.getElementsByClassName('shop-item-button')
for (let i=0; i < addToCartButons.length; i++){
    let button = addToCartButons[i]
    button.addEventListener('click', addToCartClicked)
}



function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title =shopItem.getElementsByClassName('itemTitle')[0].innerText
    let price =shopItem.getElementsByClassName('itemPrice')[0].innerText.replace(' RON', '')
    let image =shopItem.getElementsByClassName('itemImage')[0].src
    addItemToCart(title, price, image)
    updateCartTotal()
}

function addItemToCart(title, price, image) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-item')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cartItemTitle')
    for( let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title) {
            alert('Ati adaugat deja acest obiect in cosul de cumparaturi')
            return
        }
    }
    let cartRowContent=
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