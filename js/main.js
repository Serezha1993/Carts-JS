import products from "./products.js";

import { renderProductCards } from "./modules/productCards.js";

import { paginate } from "./modules/pagination.js";

window.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.js-products-list');

    // renderProductCards(products, productContainer);
    paginate(products);
})
