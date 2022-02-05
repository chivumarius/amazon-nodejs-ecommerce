// IMP. "HOMESCRIN.JS"l
import HomeScreen from "./srceens/HomeScreen";
import ProductScreen from "./srceens/ProductScreen";
import { parseRequestUrl, showLoading, hideLoading } from "./utils";
import Error404Screen from "./srceens/Error404Screen";
import CartScreen from "./srceens/CartScreen";
import SigninScreen from "./srceens/SigninScreen";
import Header from "./components/Header";
import RegisterScreen from "./srceens/RegisterScreen";
import ProfileScreen from "./srceens/ProfileScreen";
import ShippingScreen from "./srceens/ShippingScreen";
import PaymentScreen from "./srceens/PaymentScreen";
import PlaceOrderScreen from "./srceens/PlaceOrderScreen";
import OrderScreen from "./srceens/OrderScreen";
import DashboardScreen from "./srceens/DashboardScreen";
import ProductListScreen from "./srceens/ProductListScreen";
import ProductEditScreen from "./srceens/ProductEditScreen";
import OrderListScreen from "./srceens/OrderListScreen";
import Aside from "./components/Aside";

// OBJECT "ROUTES" FUNC.:
const routes = {
  "/": HomeScreen,
  "/product/:id/edit": ProductEditScreen,
  "/product/:id": ProductScreen,
  "/order/:id": OrderScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
  "/register": RegisterScreen,
  "/profile": ProfileScreen,
  "/shipping": ShippingScreen,
  "/payment": PaymentScreen,
  "/placeorder": PlaceOrderScreen,
  "/dashboard": DashboardScreen,
  "/productlist": ProductListScreen,
  "/orderlist": OrderListScreen,
};

// ASYNC FUNC. "ROUTER" :
const router = async () => {
  // FUNCTION CALLING:
  showLoading();

  // REQUEST:
  const request = parseRequestUrl();

  // DEFINING "PARSEURL":
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  // CONDITION:
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  // ------------------------------------------------------------
  // HEADER
  // ------------------------------------------------------------
  // GETTING "HEADER-CONTAINER":
  const header = document.getElementById("header-container");
  // RENDER "HEADER":
  header.innerHTML = await Header.render();
  // CALLING "AFTER_RENDER" FOR "HEADER":
  await Header.after_render();
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // SIDEBAR MENU
  // ------------------------------------------------------------
  // GETTING "ASIDE-CONTAINER":
  const aside = document.getElementById("aside-container");
  // RENDER "ASIDE":
  aside.innerHTML = await Aside.render();
  // CALLING "AFTER_RENDER" FOR "HEADER":
  await Aside.after_render();
  // ------------------------------------------------------------

  // GETTING ACCESS TO "MAIN-CONTAINER":
  const main = document.getElementById("main-container");

  // RENDER "SCREEN":
  main.innerHTML = await screen.render();

  // IF "SCREEN. AFTER_RENDER" EXIST → THEN CALL IT:
  if (screen.after_render) await screen.after_render();

  // FUNCTION CALLING:
  hideLoading();
};

// SETTING "LOAD"  EVENT → TO "ROUTER()" FUNC.:
window.addEventListener("load", router);

// ADDIN "EVENT LISTENER" → FOR "HASH CHANGE" OF THE "WINDOW":
window.addEventListener("hashchange", router);
