// IMPORTS:
import DashboardMenu from "../components/DashboardMenu";
import { getProducts, createProduct, deleteProduct } from "../api";
import { showLoading, hideLoading, rerender, showMessage } from "../utils";

// OBJECT "PRODUCT LIST SCREEN":
const ProductListScreen = {
  // METHOD "AFTER_RENDER()":
  after_render: () => {
    // -----------------------------------------------------------------
    // (1) "CREATE PRODUCT BUTTON" HANDLER:
    // -----------------------------------------------------------------

    // GETTING ID "CREATE-PRODUCT-BUTTON"
    // & ADDING "CLICK LISTENER EVEBT":
    document
      .getElementById("create-product-button")
      .addEventListener("click", async () => {
        // CREATING PRODUCTl
        const data = await createProduct();

        // REDIRECT USER → TO THE "PRODUCT DETAILS":
        document.location.hash = `/product/${data.product._id}/edit`;
      });
    // -----------------------------------------------------------------

    // -----------------------------------------------------------------
    // (2) "EDIT BUTTON" HANDLER:
    // -----------------------------------------------------------------

    // GETTING ACCESS → TO "EDIT" BUTTONS:
    const editButtons = document.getElementsByClassName("edit-button");

    // CONVERTING "EDIT BUTTONS" → TO "ARRAY":
    Array.from(editButtons).forEach((editButton) => {
      // ADDING "CLIC" EVENT LISTENER:
      editButton.addEventListener("click", () => {
        // REDIRECTING "USER" → TO "EDIT" PAGE → FOR THAT "PRODUCT":
        document.location.hash = `/product/${editButton.id}/edit`;
      });
    });
    // -----------------------------------------------------------------

    // -----------------------------------------------------------------
    // (3) "DELETE BUTTON" HANDLER:
    // -----------------------------------------------------------------

    // GETTING ACCESS → TO "DELETE" BUTTONS:
    const deleteButtons = document.getElementsByClassName("delete-button");

    // CONVERTING "DELETE BUTTONS" → TO "ARRAY":
    Array.from(deleteButtons).forEach((deleteButton) => {
      // ADDING "CLIC" EVENT LISTENER:
      deleteButton.addEventListener("click", async () => {
        // GETTING "USER CONFIRMATION" → FOR "DELETING THE PRODUCT":
        if (confirm("Are you sure to delete this product?")) {
          // CALLING "SHOW LOADING" FUNCTION:
          showLoading();

          // DELETING THE PRODUCT BY ID
          const data = await deleteProduct(deleteButton.id);

          // CHECKING IF THERE IS AN "DATA ERROR"l
          if (data.error) {
            // CALLING "SHOW MESSAGE" FUNCTION:
            showMessage(data.error);
          } else {
            // CALLING "RERENDER()" FUNCTION:
            rerender(ProductListScreen);
          }

          // CALLING "HIDE LOADING" FUNCTION:
          hideLoading();
        }
      });
    });
  },

  // ASYNC METHOD "RENDER()":
  render: async () => {
    // "AJAX REQUEST" → FOR "GETTING PRODUCTS":
    const products = await getProducts();

    // THEMPLATE LITERALS:
    return `
      <div class="dashboard">
        ${DashboardMenu.render({ selected: "products" })}
        <div class="dashboard-content">
          <h1>Products</h1>
          
          <button id="create-product-button" class="primary">
            Create Product
          </button>

          <div class="product-list">
            <table>
              <!-- TABLE HEADER -->
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th class="tr-action">ACTION</th>
                <tr>
              </thead>
              
              <!-- TABLE BODY -->
              <tbody>
                ${products
                  .map(
                    (product) => `
                      <tr>
                        <td>${product._id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.category}</td>
                        <td>${product.brand}</td>
                        
                        <!-- ACTION BUTTONS -->
                        <td>
                          <button id="${product._id}" class="edit-button">Edit</button>
                          <button id="${product._id}" class="delete-button">Delete</button>
                        </td>
                      </tr>
                    `
                  )
                  .join("\n")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },
};

// EXPORT:
export default ProductListScreen;
