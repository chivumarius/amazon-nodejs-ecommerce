// IMPORTS:
import DashboardMenu from "../components/DashboardMenu";
import { getOrders, deleteOrder } from "../api";
import { showLoading, hideLoading, rerender, showMessage } from "../utils";

// OBJECT "ORDER LIST SCREEN":
const OrderListScreen = {
  // METHOD "AFTER_RENDER()":
  after_render: () => {
    // -----------------------------------------------------------------
    // (1) "DELETE BUTTON" HANDLER:
    // -----------------------------------------------------------------

    // GETTING ACCESS → TO "DELETE" BUTTONS:
    const deleteButtons = document.getElementsByClassName("delete-button");

    // CONVERTING "DELETE BUTTONS" → TO "ARRAY":
    Array.from(deleteButtons).forEach((deleteButton) => {
      // ADDING "CLIC" EVENT LISTENER:
      deleteButton.addEventListener("click", async () => {
        // GETTING "USER CONFIRMATION" → FOR "DELETING THE PRODUCT":
        if (confirm("Are you sure to delete this order?")) {
          // CALLING "SHOW LOADING" FUNCTION:
          showLoading();

          // DELETING THE ORDER BY ID
          const data = await deleteOrder(deleteButton.id);

          // CHECKING IF THERE IS AN "DATA ERROR"l
          if (data.error) {
            // CALLING "SHOW MESSAGE" FUNCTION:
            showMessage(data.error);
          } else {
            // CALLING "RERENDER()" FUNCTION:
            rerender(OrderListScreen);
          }

          // CALLING "HIDE LOADING" FUNCTION:
          hideLoading();
        }
      });
    });
  },

  // ASYNC METHOD "RENDER()":
  render: async () => {
    // "AJAX REQUEST" → FOR "GETTING ORDERS":
    const orders = await getOrders();

    // THEMPLATE LITERALS:
    return `
      <div class="dashboard">
        ${DashboardMenu.render({ selected: "orders" })}
        <div class="dashboard-content">
          <h1>Orders</h1>
           
          <div class="order-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>USER</th>
                  <th>PAID AT</th>
                  <th>DELIVERED AT</th>
                  <th class="tr-action">ACTION</th>
                <tr>
              </thead>
              <tbody>
                ${orders
                  .map(
                    (order) => `
                <tr>
                  <td>${order._id}</td>
                  <td>${order.createdAt}</td>
                  <td>${order.totalPrice}</td>
                  <td>${order.user.name}</td>
                  <td>${order.paidAt || "No"}</td>
                  <td>${order.deliveredAt || "No"}</td>
                  <td>
                  <button id="${order._id}" class="edit-button">Edit</button>
                  <button id="${
                    order._id
                  }" class="delete-button">Delete</button>
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
export default OrderListScreen;
