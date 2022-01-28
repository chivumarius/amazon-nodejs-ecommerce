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

// EXP. FUNC. "GET SHIPPING()"
export const getShipping = () => {
  // GETTING ITEM "SHIPPING"
  const shipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {
        address: "",
        city: "",
        postalCode: "",
        country: "",
      };

  // RETURN:
  return shipping;
};

// EXP. FUNC. "SET SHIPPING()"
export const setShipping = ({
  address = "",
  city = "",
  postalCode = "",
  country = "",
}) => {
  // SAVING DATA IN "LOCAL STORAGE"
  localStorage.setItem(
    "shipping",
    JSON.stringify({ address, city, postalCode, country })
  );
};

// EXP. FUNC. "GET PAYMENT()"
export const getPayment = () => {
  const payment = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : {
        paymentMethod: "paypal",
      };
  return payment;
};

// EXP. FUNC. "SET PAYMENT()"
export const setPayment = ({ paymentMethod = "paypal" }) => {
  localStorage.setItem("payment", JSON.stringify({ paymentMethod }));
};

// EXP. FUNC. "CLEAN CART()"
export const cleanCart = () => {
  // REMOVING "ITEMS" → FROM "CART ITEMS"
  localStorage.removeItem("cartItems");
};
