/* eslint-disable linebreak-style */
// IMPORT:
import Rating from "../components/Rating";
import { getProducts } from "../api";

// OBJECT
const HomeScreen = {
  // ASYNC FUNC."RENDER()":
  render: async () => {
    // GET PRODUCTS:
    const products = await getProducts();

    // CHECKING IF THERE IS A "PRODUCT.ERROR":
    if (products.error) {
      // RETURN AN ERROR:
      return `<div class="error">${products.error}</div>`;
    }

    // RETURN → "TEMPLATE LITERALS":
    return `
    <ul class="products">
      ${products
        .map(
          (product) => `
            <li>
              <div class="product">
                
                <a href="/#/product/${product._id}">
                  <img src="${product.image}" alt="${product.name}" />
                </a>

                <div class="product-name">
                  <a href="/#/product/1">
                    ${product.name}
                  </a>
                </div>

                <div class="product-rating">
                  ${Rating.render({
                    value: product.rating,
                    text: `${product.numReviews} reviews`,
                  })}
                </div>

                <div class="product-brand">
                  ${product.brand}
                </div>
                
                <div class="product-price">
                  $${product.price}
                </div>
              </div>
            </li>      
          `
        )
        .join("\n")}
    `;
  },
};

// DEFAULT EXP.:
export default HomeScreen;
