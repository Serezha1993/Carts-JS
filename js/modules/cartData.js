const cartData = () => {
    const cart = document.querySelector('.js-cart');
    const productsList = document.querySelector('.js-products-list');
    const cartList = document.querySelector('.js-cart-list');
    const cartEmpty = document.querySelector('.js-cart-empty-container');
    const cartOrder = document.querySelector('.js-cart-order-container');
    const formatter = new Intl.NumberFormat('ru');

    const productInfo = {};

    const updateCartItemCount = () => {

            cart.addEventListener('click', (event) => {

                if(!event.target.matches('.js-minus, .js-plus')) {
                    return;
                }


                let currentItems, minusBtn;
                if (event.target.matches('.js-minus') || event.target.matches('.js-plus')) {
                    const counter = event.target.closest('.js-counter');
                    // console.log('counter', counter);

                    currentItems = counter.querySelector('.js-current-items');
                    console.log('currentItems', currentItems);

                    minusBtn = counter.querySelector('.js-minus');
                }

                if(event.target.matches('.js-plus')) {
                    currentItems.textContent = ++currentItems.textContent;
                    minusBtn.classList.remove('disabled');
                    calculateTotalCartValue();

            
                }

                if(event.target.matches('.js-minus')) {
                   if(parseInt(currentItems.textContent) > 2) {
                    currentItems.textContent = --currentItems.textContent;

                   } else if (parseInt(currentItems.textContent) === 2) {
                    currentItems.textContent = --currentItems.textContent;
                    minusBtn.classList.add('disabled');
                   }
                   calculateTotalCartValue();
                }

            });
    };
    updateCartItemCount();

    const addProductToCart = () => {
        productsList.addEventListener('click', (event) => {


            if(!event.target.matches('.js-minus, .js-plus')) {
                return;
            }

            if(event.target.classList.contains('js-buy-button')) {
                // console.log(1);

                const product = event.target.closest('.js-product');

                const imageCard = product.querySelector('.js-image-card');
                const modelCard = product.querySelector('.js-title-card');
                const priceCard = product.querySelector('.js-price-card');
                const linkCard = product.querySelector('.js-link-card');

                // console.log(priceCard.textContent);

                productInfo.id = linkCard.getAttribute('id');
                productInfo.model = modelCard.textContent;
                productInfo.price = priceCard.textContent;
                productInfo.photo = imageCard.src;

                // console.log('productInfo:', productInfo);
                const  productInCart = cartList.querySelector(`#${productInfo.id}`);
                console.log('productInCart:', productInCart);


                if(productInCart) {
                    const currentItemsProduct = productInCart.querySelector('.js-current-items');
                    const minusBtn = productInCart.querySelector('.js-minus');

                    currentItemsProduct.textContent = parseInt(currentItemsProduct.textContent) + 1;

                    minusBtn.classList.remove('disabled');
                    // minusBtn.removeAttribute('disabled');
                } else {

                    renderProductInCart();
                }

               toggleCartStatus();
               calculateTotalCartValue();
            }
        });
    };

    addProductToCart();

    const renderProductInCart = () => {
        const li = document.createElement('li');
        li.classList.add('cart-item', 'column', 'ja-cart-item');

        li.innerHTML = `
        
                                <span class="close js-remove"></span>
                                <div class="cartline row jcfs aic" id="${productInfo.id}">
                                    <div class="cart-image-container">
                                        <img src="${productInfo.photo}" alt="" class="cart-img">
                                    </div>
                                    <div class="column">
                                        <div class="cart-model row jcfs aic">
                                            ${productInfo.model}
                                        </div>
                                        <div class="row jcsb aic">
                                            <div class="counter row jcc aic js-counter">
                                                <button type="button" class="minus control row jcc aic js-minus disabled" >-</button>
                                                <div class="current-items row jcc aic js-current-items">1</div>
                                                <button type="button" class="plus control row jcc aic js-plus">+</button>
                                            </div>
                                            <div class="row jcc aic">
                                                <span class="cart-price  row jcfe js-cart-price" data-price="${productInfo.price}">${productInfo.price}</span>
                                                <span class="rouble">₽</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
        
        `;
        cartList.append(li);
    };

    const removeProductFormCart = () => {

        cartList.addEventListener('click', (event) => {



            if(!event.target.matches('.js-minus, .js-plus')) {
                return;
            }

            if(event.target.classList.contains('js-remove')) {
                const cartItem = event.target.closest('.js-cart-item');
                cartItem.remove();
                toggleCartStatus();
                calculateTotalCartValue();
            }
        });
    };
    removeProductFormCart();




    const toggleCartStatus = () => {
        if(cart.querySelector('.js-cart-item')) {
            cartOrder.classList.remove('hidden');
            cartEmpty.classList.add('hidden');
        } else {
            cartOrder.classList.add('hidden');
            cartEmpty.classList.remove('hidden');
        }
        
    };
    toggleCartStatus();


    const calculateTotalCartValue = () => {
        const cartItems = document.querySelectorAll('.js-cart-item');
        const cartTotalPrice = document.querySelector('.js-cart-total-price');

        let totalCartValue = 0;

        cartItems.forEach((item) => {
            const itemCount = item.querySelector('.js-current-items');
            console.log('itemCount:', itemCount);

            const itemPrice = item.querySelector('.js-cart-price');
            console.log("itemPrice:", itemPrice);

            const itemTotalPrice = parseInt(itemCount.textContent) * parseInt(itemPrice.dataset.price.split(' ').join(''));


            itemPrice.textContent = formatter.format(itemTotalPrice);

            totalCartValue += itemTotalPrice;

        });
        cartTotalPrice.textContent = formatter.format(totalCartValue);
    };
    calculateTotalCartValue();
};


export {
    cartData
};



