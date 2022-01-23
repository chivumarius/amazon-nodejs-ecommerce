/* eslint-disable no-use-before-define */
// IMPORTS:
import { parseRequestUrl, rerender } from "../utils";
import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";

// FUNC. 'ADD TO CART':
const addToCart = (item, forceUpdate = false) => {
  // CALL FUNC. "GET CART ITEMS" (FROM "LOCAL STORAGE"):
  let cartItems = getCartItems();

  // CALL METH. ".FIND()":
  const existItem = cartItems.find((x) => x.product === item.product);

  // IF "EXIST" IN THE "CART"
  if (existItem) {
    // IF "FORCE UPDATE" IS "TRUE":
    if (forceUpdate) {
      // UBDATE PRODUCT BY ".MAP()":
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    // ADDING "ITEMS" TO "CART ITEMS":
    cartItems = [...cartItems, item];
  }

  // SAVING TO "LOCAL STORAGE" → BY CALLING "SET CART ITEMS()":
  setCartItems(cartItems);

  // CHECKING IF "FORCE UPDATE" IS "TRUE" → FOR "RERENDER":
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

// FUNC. "REMOVE FROM CART" → BY "ID":
const removeFromCart = (id) => {
  // UPDATE "LOCAL STORAGE" → BY REMOVING "ITEMS" FROM "CART ITEMS":
  setCartItems(getCartItems().filter((x) => x.product !== id));

  // CHECKING THE "ID" OF THE "DELETED PRODUCT":
  if (id === parseRequestUrl().id) {
    // USER "REDIRECT" → TO "CART" SCREEN:
    document.location.hash = "/cart";
  } else {
    rerender(CartScreen);
  }
};

// OBJECT "CART SCREEN":
const CartScreen = {
  // METH. "AFTER_RENDER":
  after_render: () => {
    // DEFINE CONSTANT "QTY SELECT":
    const qtySelects = document.getElementsByClassName("qty-select");

    // CONVERTING "QTYSELECT" → INTO "ARRAY"
    Array.from(qtySelects).forEach((qtySelect) => {
      // ADDING "EVENT LISTENER" → FOR EACH 'ITEM':
      qtySelect.addEventListener("change", (e) => {
        // GETTING "CART ITEMS" → FROM "LOCAL STORAGE":
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        // ADDING "ITEM" → TO "CART":
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });

    // DEFINE CONSTANT "DELETE BUTTONS":
    const deleteButtons = document.getElementsByClassName("delete-button");

    // CONVERTING "DELETE BUTTONS" → INTO "ARRAY"
    Array.from(deleteButtons).forEach((deleteButton) => {
      // ADDING "EVENT LISTENER" → FOR 'CLICK':
      deleteButton.addEventListener("click", () => {
        // REMOVING "ITEMS" BY "ID" → FROM "CART":
        removeFromCart(deleteButton.id);
      });
    });

    // REDIRECT "USER" → TO "SIGNIN" SCREEN → WHEN PRESSING "CHECKOUT BUTTON":
    document.getElementById("checkout-button").addEventListener("click", () => {
      document.location.hash = "/signin";
    });
  },

  // METH. "RENDER":
  render: async () => {
    // REQUEST "PARSE REQUEST URL":
    const request = parseRequestUrl();

    // CHECHING "REQUEST VALUE":
    if (request.id) {
      // GETTING "PRODUCT ID":
      const product = await getProduct(request.id);

      // CALLING FUNC. "ADD TO CART":
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }

    // CALLING FUNC. "GET CART ITEMS()" → FROM "LOCAL STORAGE":
    const cartItems = getCartItems();

    // RETURN "TEMPLATE LITERALS":
    return `
      <div class="content cart">

        <!-- COLUMN 1 - 'CART-LIST' -->
        <div class="cart-list">      
          <ul class="cart-list-container">

            <!-- TABLE  HEADER -->
            <li>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </li>

            <!-- GETTING 'CART ITEMS' -->
            ${
              // EMPTY "CART ITEM":
              cartItems.length === 0
                ? '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
                : // THERE IS "CART ITEMS":
                  cartItems
                    // UPDATE "CART ITEMS":
                    .map(
                      (item) => `
                          <li>

                            <!-- IMAGE -->
                            <div class="cart-image">
                              <img src="${item.image}" alt="${item.name}" />
                            </div>

                            <!-- NAME -->
                            <div class="cart-name">

                              <!-- ITEM NAME -->
                              <div>
                                <a href="/#/product/${item.product}">
                                  ${item.name}
                                </a>
                              </div>

                              <!-- QUANTITY -->
                              <div>
                                Qty: 
                                <select class="qty-select" id="${item.product}">

                                  <!-- CONVERTING 'ITEM CART' TO AN 'ARRAY' -->
                                  <!-- & USE FUNC. 'MAP()' → TO CONVERT THE 'ARRAY' -->
                                  <!-- TO 'SELECT OPTIONS' -->
                                  ${[...Array(item.countInStock).keys()].map(
                                    (x) =>
                                      item.qty === x + 1
                                        ? `<option selected value="${x + 1}">
                                                  ${x + 1}
                                              </option>`
                                        : `<option  value="${x + 1}">
                                                  ${x + 1}
                                              </option>`
                                  )} 

                                </select>

                                <!-- BUTTON - 'DELE E'  -->
                                <button type="button" class="delete-button" id="${
                                  item.product
                                }">
                                  Delete
                                </button>
                              </div>
                            </div>


                            <!-- PRICE -->
                            <div class="cart-price">
                              $${item.price}
                            </div>
                          </li>
                        `
                    )
                    // DISPLAY ON A "NEW LINE":
                    .join("\n")
            } 
          </ul>
        </div>


        <!-- COLUMN 2 - 'CART-ACTION' -->
        <div class="cart-action">

            <!-- COUNTING THE "ITEMS NUMBER" -->  
            <h3>
              Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
              :
              $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            
            <button id="checkout-button" class="primary fw">
              Proceed to Checkout
            </button>
        </div>
      </div>
    `;
  },
};

// EXPORT:
export default CartScreen;
