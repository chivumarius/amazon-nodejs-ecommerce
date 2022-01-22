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


    // RETURN "TEMPLATE LITERALS":
    return `
      <div>Cart Screen</div>
      <div>${getCartItems().length}</div>
    `;
  },
};


// EXPORT:
export default CartScreen;
