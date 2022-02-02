// IMPORTS:
import DashboardMenu from "../components/DashboardMenu";
import { getProducts } from "../api";

// OBJECT "PRODUCT LIST SCREEN":
const ProductListScreen = {
  // METHOD "AFTER_RENDER()":
  after_render: () => {},

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
