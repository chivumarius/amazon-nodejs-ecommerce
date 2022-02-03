// IMPORTS:
import {
  parseRequestUrl,
  showLoading,
  showMessage,
  hideLoading,
} from "../utils";
import { getProduct, updateProduct, uploadProductImage } from "../api";

// OBJECT "PRODUCT EDIT SCREEN":
const ProductEditScreen = {
  // METHOD "AFTER_RENDER":
  after_render: () => {
    // DEFINE "REQUEST":
    const request = parseRequestUrl();

    // (1) "SUBMIT  HANDLER"
    // GETTING "EDIT-PRODUCT-FORM" ID:
    document
      .getElementById("edit-product-form")
      .addEventListener("submit", async (e) => {
        // WHEN "USER" → CLIC BTN. "UPDATE"
        // THE "FORM" WILL NOT BE "POSTED" BACK → TO THE "SERVER":
        e.preventDefault();

        // CALLING "SHOW LOADING":
        showLoading();

        // CALLING "UPDATE PRODUCT()":
        const data = await updateProduct({
          _id: request.id,
          name: document.getElementById("name").value,
          price: document.getElementById("price").value,
          image: document.getElementById("image").value,
          brand: document.getElementById("brand").value,
          category: document.getElementById("category").value,
          countInStock: document.getElementById("countInStock").value,
          description: document.getElementById("description").value,
        });

        // CALLING "HIDE LOADING":
        hideLoading();

        // CHECKING IF THERE IS AN "ERROR" IN "DATA":
        if (data.error) {
          // ERROR MESSAGE:
          showMessage(data.error);
        } else {
          // OTHERWISE REDIRECT "USER" → TO "PRODUCT LIST" PAGE:
          document.location.hash = "/productlist";
        }
      });

    // (2) "CHANGE  HANDLER"
    // GETTING "IMAGE-FILE" ID:
    document
      .getElementById("image-file")
      .addEventListener("change", async (e) => {
        // GETTING "ACCESS" → TO THE "SELECTED FILE":
        const file = e.target.files[0];

        // DEFINING A NEW "FORM DATA()":
        // FOR CREATING A "BODY" SECTION → FOR "AJAX REQUEST":
        const formData = new FormData();

        // ADDING/APPEND "IMAGE" → TO "FORM DATA":
        formData.append("image", file);

        // CALLING "SHOW LOADING":
        showLoading();

        // CALLING "AJAX REQUEST" → "UPLOAD PRODUCT IMAGE()":
        const data = await uploadProductImage(formData);

        // CALLING "HIDE LOADING":
        hideLoading();

        // CHECKING IF THERE IS AN "ERROR" IN "DATA":
        if (data.error) {
          // ERROR MESSAGE:
          showMessage(data.error);
        } else {
          // SUCCESS MESSAGE:
          showMessage("Image uploaded successfully.");

          // SETTING "IMAGE TEXT FIELD" VALUE
          // → TO THE "UPLOADED FILE PATH" VALUE:
          document.getElementById("image").value = data.image;
        }
      });
  },

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

                <input type="file" name="image-file" id="image-file" />
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
