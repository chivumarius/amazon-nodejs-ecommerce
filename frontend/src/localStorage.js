// EXP. FUNC. "GET CART ITEMS"
export const getCartItems = () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
};

// EXP. FUNC. "SET CART ITEMS()"
// FOR "SAVING" - "CART TEM" → TO "LOCAL STORAGE":
export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// EXP. FUNC. "SET USER INFO()"
// SAVING DATA → FROM "USER":
export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  password = "",
  token = "",
  isAdmin = false,
}) => {
  // METH. "SET ITEM()":
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      _id,
      name,
      email,
      password,
      token,
      isAdmin,
    })
  );
};

// EXP. FUNC. "CLEAR USER()"
export const clearUser = () => {
  // REMOVING ITEMS:
  localStorage.removeItem("userInfo");
};

// EXP. FUNC. "GET USER INFO()"
// GETTING  GET "USER INFO()" → FROM "LOCAL STORAGE":
export const getUserInfo = () =>
  // METH. "GET ITEM()":
  localStorage.getItem("userInfo")
    ? // CONVERTING "INSERTED STRING VALUE" → INTO "JS OBJECT":
      JSON.parse(localStorage.getItem("userInfo"))
    : // INSERT "USER INFO" → IF THE "USER" DOES NOT EXIST
      { name: "", email: "", password: "" };
