// IMPORTS:
import { parseRequestUrl } from '../utils';
import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';


// FUNC. 'ADD TO CART':
const addToCart = (item, forceUpdate = false) => {
  
  // CALL FUNC. "GET CART ITEMS" (FROM "LOCAL STORAGE"):
  let cartItems = getCartItems();
  
  // CALL METH. ".FIND()":
  const existItem = cartItems.find((x) => x.product === item.product);
  
  // IF "EXIST" IN THE "CART"
  if (existItem) {
    
    // UBDATE PRODUCT BY ".MAP()":
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );

  } else {
    // ADDING "ITEMS" TO "CART ITEMS":
    cartItems = [...cartItems, item];
  }
  
  // SAVING TO "LOCAL STORAGE" → BY CALLING "SET CART ITEMS()":
  setCartItems(cartItems);
};


// OBJECT "CART SCREEN":
const CartScreen = {
  
  // METH. "AFTER_RENDER": 
  after_render: () => {},
  

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
                ? 
                  '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
                : 
                  // THERE IS "CART ITEMS":
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
                                  <option value="1">1</option>
                                </select>

                                <!-- BUTTON - 'DELETE' -->
                                <button type="button" class="delete-button" id="${item.product}">
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
                    .join('\n')
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
