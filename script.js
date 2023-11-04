//Displaying All products on the shop
const shopList = document.querySelector('.shop-items');
function displayAllProducts() {
    products.forEach((product) => {
        shopList.innerHTML += `
            <div class="col-md-4 my-3">
                <div class="item">
                    <p class="item-id">${product.id}</p>
                    <img src="${product.imageSRC}" alt="" class="item-image">
                    <h3 class="item-name">${product.name}</h3>
                    <p class="item-price">R${product.price}</p>
                    <div class="quantity-container">
                        <button class="minus">-</button>
                        <input type="number" name="item-quantity" class="quantity" value="${product.defaultQuantity}" readonly>
                        <button class="plus">+</button>
                    </div>
                    <button class="add-cart">Add To Cart</button>
                </div>
            </div>
        `
    })
}
displayAllProducts();

// Opening and closing the side cart
const body = document.querySelector('body');
const openCart = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close');

openCart.addEventListener('click', () => {
    body.classList.add('active');
})

closeCart.addEventListener('click', () => {
    body.classList.remove('active');
})


// Increasing or decrease item count
const plusButtons = document.querySelectorAll('.plus');
const minusButtons = document.querySelectorAll('.minus');

plusButtons.forEach((plusButton) => {
    plusButton.addEventListener('click', (event) => {
        const item = event.target.closest('.item');
        const itemQuantity = item.querySelector('.quantity');
        itemQuantity.value++;
    })
})

minusButtons.forEach((minusButton) => {
    minusButton.addEventListener('click', (event) => {
        const item = event.target.closest('.item');
        const itemQuantity = item.querySelector('.quantity')
        if(parseInt(itemQuantity.value) === 1) {
            itemQuantity.value = 1;
        }else{
            itemQuantity.value--;
        }
    })
})


// Adding the items to the side cart
const addButtons = document.querySelectorAll('.add-cart');
let cartItems = [];

addButtons.forEach((addToCart) => {
    addToCart.addEventListener('click', (event) => {
        let cartItem = null;
        const item = event.target.closest('.item');
        const itemId = item.querySelector('.item-id');
        const itemQuantity = item.querySelector('.quantity');

        const productItem = products.find((product) => product.id === parseInt(itemId.innerHTML));

        if(productItem) {
            const existingItem = cartItems.find((item) => item.id === productItem.id);

            if(existingItem){
                existingItem.quantity = parseInt(existingItem.quantity) + parseInt(itemQuantity.value);
            }else{
                cartItem = {
                    id: productItem.id,
                    name: productItem.name,
                    price: productItem.price,
                    imageSRC: productItem.imageSRC,
                    quantity: itemQuantity.value
                }
            }   
            if(cartItem !== null){
                cartItems.push(cartItem);
            }
        }
        itemQuantity.value = 1;
        displayCartProducts();
        updateTotal();
    })
})


// Displaying all products on the side cart
const cartList = document.querySelector('.list');
function displayCartProducts() {
    cartList.innerHTML = "";
    cartItems.forEach((item) => {
        cartList.innerHTML += `
            <li>
                <img src="${item.imageSRC}" alt="">
                <p>R${item.price * item.quantity}</p>
                <div>
                    <button class="cart-minus" onclick="changeItemQuantity('minus', ${item.id})">-</button>
                    <input type="text" class="cart-quantity" readonly value="${item.quantity}">
                    <button class="cart-plus" onclick="changeItemQuantity('plus', ${item.id})">+</button>
                </div>
            </li>
        `;
    });
}

// Changing the number of units in the cart
function changeItemQuantity(action, id) {
    const cartItem = cartItems.find((item) => item.id === id);
    if(cartItem) {
        if(action === "plus") {
            cartItem.quantity++;
            updateTotal();
        }else if(action === "minus") {
            cartItem.quantity--;
            if(cartItem.quantity === 0){
                console.log(cartItems.indexOf(cartItem));
                cartItems.splice(cartItems.indexOf(cartItem), 1);
                console.log(cartItems);
            }
            updateTotal();
        }
    }
    updateCart();
}


// Updating the cart-icon count, cart subtotal and the side-cart item count
const itemCount = document.querySelector('.item-count');
const sideCartItemCount = document.querySelector('.cart-item-count');
const subTotal = document.querySelector('.sub-total');

function updateTotal() {
    const totalItemsInCart = cartItems.reduce((total, item) => total + parseInt(item.quantity), 0);
    itemCount.innerHTML = totalItemsInCart;
    sideCartItemCount.innerHTML = totalItemsInCart;
    const totalPriceInCart = cartItems.reduce((total, item) => total + (parseInt(item.price) * parseInt(item.quantity)), 0);
    subTotal.innerHTML = totalPriceInCart;
}

function updateCart() {
    displayCartProducts();
}
