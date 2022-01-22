// EXP. FUNC. "GET CART ITEMS"
export const getCartItems = () => {
  // METH. ".GET ITEM( KEY )":
  const cartItems = localStorage.getItem('cartItems')
    ? 
      // CONVERTING "LOCAL STORAGE" → TO "JS" OBJECT:
      JSON.parse(localStorage.getItem('cartItems'))
    : 
      [];
  
  // RETURNING:
  return cartItems;
};

  // FUNC. "SET CART ITEMS()"
  // FOR "SAVING" - "CART TEM" → TO "LOCAL STORAGE":
  export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
