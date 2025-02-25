import products from "./products.js";
import { renderProductCards } from "./modules/productCards.js";
import { paginate } from "./modules/pagination.js";
import { closeCart, openCart } from "./modules/cartPopup.js";
import { cartData } from "./modules/cartData.js";

window.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.js-products-list');

    // renderProductCards(products, productContainer);
    paginate(products);
    openCart();
    closeCart();
    cartData();
})
