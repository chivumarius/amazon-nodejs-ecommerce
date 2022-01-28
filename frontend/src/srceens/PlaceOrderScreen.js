// OMPORTS:
import { getCartItems, getShipping, getPayment } from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";

// FUNCTION "CONVERT CART TO ORDER":
const convertCartToOrder = () => {
  // GETTING "CART ITEMS" & SAVED INTO "ORDER ITEMS" CONSTANT:
  const orderItems = getCartItems();

  // IF THERE "ISN'T ORDER" → TO PLACE:
  if (orderItems.length === 0) {
    // REDIRECT "USER" → TO "CART":
    document.location.hash = "/cart";
  }
  // GETTING "SHIPPING" & SAVED INTO "SHIPPING" CONSTANT:
  const shipping = getShipping();

  // IF THERE "ISN'T ADDRESS" → INTO "SHIPPING":
  if (!shipping.address) {
    // REDIRECT "USER" → TO "SHIPPING":
    document.location.hash = "/shipping";
  }

  // GETTING "PAYMENT" & SAVED INTO "PAYMENT" CONSTANT:
  const payment = getPayment();

  // IF THERE "ISN'T PAYMENT METHOD" → INTO "PAYMENT":
  if (!payment.paymentMethod) {
    // REDIRECT "USER" → TO "PAYMENT":
    document.location.hash = "/payment";
  }

  // CALCULATION OF THE BREAKDOWN PRICE:
  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // THE OBJECT INFO:
  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

// OBJECT "PLACE ORDER SCREEN":
const PlaceOrderScreen = {
  // METH. "AFTER_RENDER":
  after_render: () => {},

  // METH. "RENDER":
  render: () => {
    // PROPERTIES DESTRUCTURING → FROM "CONVERT CART TO ORDER" FUNCTION:
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartToOrder();

    // TEMPLATE LITERALS → FOR SHOWING INFO TO THE "USERS":
    return `
      <div>
        <!-- STEP ENABELING -->
        ${CheckoutSteps.render({
          step1: true,
          step2: true,
          step3: true,
          step4: true,
        })}
        <div class="order">
          <div class="order-info">

            <!-- SHIPPING -->
            <div>
              <h2>Shipping</h2>
              <div>
                <!-- SHIPPING INFO -->
                ${shipping.address}, 
                ${shipping.city}, 
                ${shipping.postalCode}, 
                ${shipping.country}
              </div>
            </div>

            <!-- SHPAYMENTIPPING -->
            <div>
              <h2>Payment</h2>
              <div>
                Payment Method : ${payment.paymentMethod}
              </div>
            </div>

            <!-- SHIPPING CART PRICE -->
            <div>
              <ul class="cart-list-container">
                <li>
                  <h2>Shopping Cart</h2>
                  <div>Price</div>
                </li>

                ${orderItems
                  .map(
                    (item) => `
                  <li>
                    <!-- 'IMAGE' FOR 'PRODUCT' -->
                    <div class="cart-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>

                     <!-- 'NAME' FOR 'PRODUCT' -->
                    <div class="cart-name">
                      <div>
                        <a href="/#/product/${item.product}">${item.name} </a>
                      </div>
                      <div> Qty: ${item.qty} </div>
                    </div>

                     <!-- 'PRICE' FOR 'PRODUCT' -->
                    <div class="cart-price"> $${item.price}</div>
                  </li>
                  `
                  )
                  .join("\n")}
              </ul>
            </div>
          </div>

          <!-- ORDER SUMMARY -->
          <div class="order-action">
            <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li><div>Items</div><div>$${itemsPrice}</div></li>
                  <li><div>Shipping</div><div>$${shippingPrice}</div></li>
                  <li><div>Tax</div><div>$${taxPrice}</div></li>
                  <li class="total"><div>Order Total</div><div>$${totalPrice}</div></li> 
                  <li>
                  <button class="primary fw">
                  Place Order
                  </button>
          </div>
        </div>
      </div>
    `;
  },
};

// EXPORT:
export default PlaceOrderScreen;
