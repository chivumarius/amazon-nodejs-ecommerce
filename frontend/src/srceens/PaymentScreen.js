// IMPORTS:
import { getUserInfo, setPayment } from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";

// OBJECT "PAYMENT SCREEN":
const PaymentScreen = {
  // FUNC. "AFTER_RENDER()":
  after_render: () => {
    document
      .getElementById("payment-form")
      .addEventListener("submit", async (e) => {
        // THIS FUNCTION "PREVENTS" THE "FORM"
        // FROM BEING "SENT" TO THE "SERVER"
        // AFTER "REFRESHING" AND "PRESSING" THE "BUTTON:"
        e.preventDefault();

        // "PAYMENT METHOD":
        const paymentMethod = document.querySelector(
          'input[name="payment-method"]:checked'
        ).value;

        // SETTING "PAYMENT METHOD":
        setPayment({ paymentMethod });

        // REDIRECT USER → TO "/PLACEORDER":
        document.location.hash = "/placeorder";
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

    // TEMPLATE LITERALS:
    return `
    
      ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
      
      <div class="form-container">
        <form id="payment-form">
          <ul class="form-items">
            <li>
              <h1>Payment</h1>
            </li>

            <li>
              <div>
                <input type="radio"
                  name="payment-method"
                  id="paypal"
                  value="Paypal"
                  checked 
                />
                <label for="paypal" >PayPal</label>
               </div> 
            </li>

            <li>
              <div>
                <input 
                  type="radio"
                  name="payment-method"
                  id="stripe"
                  value="Stripe"
                />
                <label for="stripe" >Stripe</label>
              </div> 
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
export default PaymentScreen;
