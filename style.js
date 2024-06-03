document.addEventListener('DOMContentLoaded',()=>{
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartDrawer = document.getElementById('cart-drawer');
    const overLay = document.getElementById('overlay');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const openCartBtn = document.getElementById('open-cart-btn');
    const cartCount = document.getElementById('cart-count');

    let cart = [];

    const noItem = document.createElement('p')
    noItem.id = 'empty-message';
    noItem.textContent = 'Your cart is empty';
    cartItems.appendChild(noItem)
    //get all product
    
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products=>{
        products.forEach(product=>{
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
            <button onclick="addTocart(${product.id})" >Add to cart </button>
            
            `
            productList.appendChild(productDiv);
        })
    })
    //add to cart button
    window.addTocart = function(id){
        // console.log(id)
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(response => response.json())
    .then(product=>{
        const cartItem = cart.find(item => item.id === product.id)
        if(cartItem){
            cartItem.quantity += 1

        }else{
            product.quantity = 1
            cart.push(product)
        }
        //Update logic here
        renderCartUpdate()
    })
}
        window.incrementQuantity = function(id){
            const cartItem = cart.find(item => item.id == id)
            if(cartItem){
                cartItem.quantity += 1
            }
            renderCartUpdate()
        }

        window.decrementQuantity = function(id){
            const cartItem = cart.find(item => item.id == id)
            if(cartItem && cartItem.quantity > 1){
                cartItem.quantity -= 1
            }else{
                cart = cart.filter(item => item.id !== id)
            }
            renderCartUpdate()
        }

        window.removeFromCart = function(id){
            cart = cart.filter(item => item.id !== id)
            renderCartUpdate()
        }



        function renderCartUpdate(){
            cartItems.innerHTML = '';
            let totalItems = 0;
            let totalPrice = 0;
            cart.forEach(item =>{
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;
                const cartItem = document.createElement('li')
                
                cartItem.innerHTML = `<div class="cartMain">
                <div class="image">
                <img src="${item.image}" alt="${item.image}" />
                </div>
                
                <button class="cartBtnOne" onclick="incrementQuantity(${item.id})">+</button>
                <button class="cartBtnOne" onclick="decrementQuantity(${item.id})"> -</button>
                <button class="cartBtnOne" onclick="removeFromCart(${item.id})">Remove</button> </br>
                ${item.title} - ${item.price} x ${item.quantity}
                </div>
                `;
                cartItems.appendChild(cartItem);
            })
            cartTotal.innerHTML = `Total item: ${totalItems}, Total price: $${totalPrice.toFixed(2)}`
        cartCount.textContent = totalItems;
        cartMsg()
        }
        function cartMsg(){
            if(cart.length === 0){
                noItem.style.display = 'block'
            }else{
                noItem.style.display = 'none'
            }
        }
        //open cart drawer
        openCartBtn.addEventListener('click',()=>{
            cartDrawer.classList.add('open');
            overLay.classList.add('visible')
        })

        //close cart drawer
        closeCartBtn.addEventListener('click',()=>{
            cartDrawer.classList.remove('open');
            overLay.classList.remove('visible')
        })

        //close the cart and remove the overlay when u click the overlay.
        overLay.addEventListener('click',()=>{
            cartDrawer.classList.remove('open');
            overLay.classList.remove('visible')
        })
    })


