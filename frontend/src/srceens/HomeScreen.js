/* eslint-disable linebreak-style */
// IMPORT:
import axios from "axios";
import Rating from "../components/Rating";
import { hideLoading, showLoading } from "../utils";

// OBJECT
const HomeScreen = {
  // ASYNC FUNC."RENDER()":
  render: async () => {
    // FUNCTION CALLING:
    showLoading();

    // METHOD"AXIOS()" → GET "DATA.JS" FROM "BACKEND" → BY SENDING "AJAX REQUEST" TO "SERVER":
    const response = await axios({
      url: "http://localhost:5000/api/products",

      headers: {
        "Content-Type": "application/json",
      },
      // eslint-disable-next-line linebreak-style
    });

    // FUNCTION CALLING:
    hideLoading();

    // CHECKING "RESPONSE":
    if (!response || response.statusText !== "OK") {
      // RETURN AN ERROR:
      return "<div>Error in getting data</div>";
    }

    // OBJ. "DATA":
    const products = response.data;

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
