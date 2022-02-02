// IMPORTS:
import { parseRequestUrl } from "../utils";
import { getProduct } from "../api";

// OBJECT "PRODUCT EDIT SCREEN":
const ProductEditScreen = {
  // METHOD "AFTER_RENDER":
  after_render: () => {},

  // ASYNC METHOD "RENDER":
  render: async () => {
    // CALLING "PARS REQUEST URL()":
    const request = parseRequestUrl();

    // GETTING "PRODUCT ID":
    const product = await getProduct(request.id);

    // TEMPLATE LITERALS:
    return `
      <div class="content">
        <div>
          <a href="/#/productlist">Back to products</a>
        </div>

        <!-- FORM-CONTAINER -->
        <div class="form-container">
          <form id="edit-product-form">
            <ul class="form-items">
              <!-- TITLE -->
              <li>
                <h1>Edit Product ${product._id.substring(0, 8)}</h1>
              </li>

              <!-- NAME -->
              <li>
                <label for="name">Name</label>
                <input type="text" name="name" value="${
                  product.name
                }" id="name" />
              </li>

              <!-- PRICE -->
              <li>
                <label for="price">Price</label>
                <input type="number" name="price" value="${
                  product.price
                }" id="price" />
              </li>

              <!-- IMAGE -->
              <li>
                <label for="image">Image (680 x 830)</label>
                <input type="text" name="image" value="${
                  product.image
                }" id="image" />
              </li>

              <!-- BRAND -->
              <li>
                <label for="brand">Brand</label>
                <input type="text" name="brand" value="${
                  product.brand
                }" id="brand" />
              </li>

              <!-- STOCK NUMBER -->
              <li>
                <label for="countInStock">Count In Stock</label>
                <input type="text" name="countInStock" value="${
                  product.countInStock
                }" id="countInStock" />
              </li>

              <!-- CATEGORY -->
              <li>
                <label for="category">Category</label>
                <input type="text" name="category" value="${
                  product.category
                }" id="category" />
              </li>

              <!-- DESCRIPTION -->
              <li>
                <label for="description">Description</label>
                <input type="text" name="description" value="${
                  product.description
                }" id="description" />
              </li>

              <!-- UPDATE -->
              <li>
                <button type="submit" class="primary">Update</button>
              </li>
            </ul>

          </form>
        </div>

      </div>
    `;
  },
};

// EXPORT:
export default ProductEditScreen;
