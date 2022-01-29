// OMPORTS:
import { parseRequestUrl } from "../utils";
import { getOrder } from "../api";

// OBJECT "ORDER SCREEN":
const OrderScreen = {
  // ASYNC METH. "AFTER_RENDER":
  after_render: async () => {},

  // METH. "RENDER":
  render: async () => {
    // GETTING "REQUEST" INFORMATIONS:
    const request = parseRequestUrl();

    // SENDING "AJAX REQUEST" → TO THE "SERVER"
    // TO" GET ORDER" BY "ID":
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);

    // TEMPLATE LITERALS → FOR SHOWING INFO TO THE "USERS":
    return `
      <div>
      <h1>Order ${_id}</h1>
        <div class="order">
          <div class="order-info">

            <!-- SHIPPING -->
            <div>
              
              <h2>Shipping</h2>
              
              <div>
                ${shipping.address}, 
                ${shipping.city}, 
                ${shipping.postalCode}, 
                ${shipping.country}
              </div>

              ${
                isDelivered
                  ? `<div class="success">Delivered at ${deliveredAt}</div>`
                  : `<div class="error">Not Delivered</div>`
              }               
            </div>

            <!-- PAYMENT -->  
            <div>
              <h2>Payment</h2>
              
              <div>
                Payment Method : ${payment.paymentMethod}
              </div>
              
              ${
                isPaid
                  ? `<div class="success">Paid at ${paidAt}</div>`
                  : `<div class="error">Not Paid</div>`
              }
            </div>

             <!-- SHIPPING CART -->  
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
                     <!-- IMAGE - PRODUCT -->
                    <div class="cart-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>

                    <!-- QUANTITY - PRODUCT -->
                    <div class="cart-name">
                      <div>
                        <a href="/#/product/${item.product}">${item.name} </a>
                      </div>
                      <div> Qty: ${item.qty} </div>
                    </div>

                     <!-- PRICE - PRODUCT -->
                    <div class="cart-price"> $${item.price}</div>
                  </li>
                  `
                  )
                  .join("\n")}
              </ul>
            </div>
          </div>

           <!-- ORDER-ACTION -->
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
                 
          </div>
        </div>
      </div>
    `;
  },
};

// EXPORT:
export default OrderScreen;
