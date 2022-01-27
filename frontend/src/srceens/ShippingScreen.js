// IMPORTS:
import { getUserInfo, getShipping, setShipping } from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";

// OBJECT "SHIPPING SCREEN":
const ShippingScreen = {
  // FUNC. "AFTER_RENDER()":
  after_render: () => {
    // SHIPPING FORM
    document
      .getElementById("shipping-form")
      .addEventListener("submit", async (e) => {
        // THIS FUNCTION "PREVENTS" THE "FORM"
        // FROM BEING "SENT" TO THE "SERVER"
        // AFTER "REFRESHING" AND "PRESSING" THE "BUTTON:"
        e.preventDefault();

        // GETTING "SHIPPING" INFO:
        setShipping({
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          postalCode: document.getElementById("postalCode").value,
          country: document.getElementById("country").value,
        });

        // REDIRECT USER → TO "/PAYMENT":
        document.location.hash = "/payment";
      });
  },

  // FUNC. "RENDER()":
  render: () => {
    // PROPERTY DESTRUCTION
    const { name } = getUserInfo();

    // IF "USER NAME" DOESN'T EXIST:
    if (!name) {
      // REDIRECT "USER" → TO "HOME PAGE":
      document.location.hash = "/";
    }

    // PROPERTY DESTRUCTION
    const { address, city, postalCode, country } = getShipping();

    // TEMPLATE LITERALS:
    return `
      ${CheckoutSteps.render({ step1: true, step2: true })}
      
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">

            <li>
              <h1>Shipping</h1>
            </li>

            <li>
              <label for="address">Adress</label>
              <input type="text" name="address" id="address" value="${address}" />
            </li>

            <li>
              <label for="city">City</label>
              <input type="text" name="city" id="city" value="${city}" />
            </li>

            <li>
              <label for="postalCode">Postal Code</label>
              <input type="text" name="postalCode" id="postalCode" value="${postalCode}" />
            </li>

            <li>
              <label for="country">Country</label>
              <input type="text" name="country" id="country" value="${country}" />
            </li>

            <li>
              <button type="submit" class="primary">Continue</button>
            </li>  

          </ul>
        </form>
      </div>
    `;
  },
};

// EXPORT:
export default ShippingScreen;
