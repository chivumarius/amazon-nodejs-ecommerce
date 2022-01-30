// IMPORTS:
import { update, getMyOrders } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { showLoading, hideLoading, showMessage } from "../utils";

// OBJECT "PROFILE SCREEN":
const ProfileScreen = {
  // FUNC. "AFTER_RENDER()":
  after_render: () => {
    // SIGNOUT → WITH "EVENT LISTENER" FOR "CLICK"
    document.getElementById("signout-button").addEventListener("click", () => {
      // CLEAR "USER INFO" → FROM "LOCAL STORAGE":
      clearUser();

      // REDIRECT USER TO "HOMEPAGE":
      document.location.hash = "/";
    });

    // PROFILE FORM
    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        // THIS FUNCTION "PREVENTS" THE "FORM"
        // FROM BEING "SENT" TO THE "SERVER"
        // AFTER "REFRESHING" AND "PRESSING" THE "BUTTON:"
        e.preventDefault();

        // FUNCTION CALLING:
        showLoading();

        // CALLING FUNC. "REGISTER" API
        // & SENDING "REQUEST" TO THE "SERVER":
        const data = await update({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });

        // FUNCTION CALLING:
        hideLoading();

        // IF THERE IS AN "ERROR":
        if (data.error) {
          // SHOW ERROR MESSAGE:
          showMessage(data.error);
        } else {
          // SAVING "USER INFO" → BASED ON "DATA":
          setUserInfo(data);

          // REDIRECT USER → TO "HOME PAGE":
          document.location.hash = "/";
        }
      });
  },

  // ASYNC FUNC. "RENDER()":
  render: async () => {
    // GETTING "USER INFO":
    const { name, email } = getUserInfo();

    // IF "USER NAME" DOESN'T EXIST:
    if (!name) {
      // REDIRECT "USER" → TO "HOME PAGE":
      document.location.hash = "/";
    }

    // GETTING "MY ORDERS"::
    const orders = await getMyOrders();

    // TEMPLATE LITERALS:
    return `
      <div class="content profile">
      
        <!-- PROFILE  INFO -->
        <div class="profile-info">
          <div class="form-container">
            <form id="profile-form">
              <ul class="form-items">
                
                <li>
                  <h1>User Profile</h1>
                </li>

                <li>
                  <label for="name">Name</label>
                  <input type="name" name="name" id="name" value="${name}" />
                </li>

                <li>
                  <label for="email">Email</label>
                  <input type="email" name="email" id="email" value="${email}" />
                </li>
                <li>
                  <label for="password">Password</label>
                  <input type="password" name="password" id="password" />
                </li>

                <li>
                  <button type="submit" class="primary">Update</button>
                </li>

                <li>
                <button type="button" id="signout-button" >Sign Out</button>
              </li>        
              </ul>
            </form>
          </div>
        </div>

        <!-- ORDER  HISTORY -->
        <div class="profile-orders">
          <h2>Order History</h2>
          
          <table>
            <!-- TABLE HEAD -->
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <!-- TABLE BODY -->
            <tbody>
              ${
                orders.length === 0
                  ? `<tr><td colspan="6">No Order Found.</tr>`
                  : orders
                      .map(
                        (order) => `
                          <tr>
                            <td>${order._id}</td>
                            <td>${order.createdAt}</td>
                            <td>${order.totalPrice}</td>
                            <td>${order.paidAt || "No"}</td>
                            <td>${order.deliveryAt || "No"}</td>
                            <td><a href="/#/order/${
                              order._id
                            }">DETIALS</a> </td>
                          </tr>
                        `
                      )
                      .join("\n")
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
};

// EXPORT:
export default ProfileScreen;
