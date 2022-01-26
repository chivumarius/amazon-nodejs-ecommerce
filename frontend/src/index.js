// IMP. "HOMESCRIN.JS"l
import HomeScreen from "./srceens/HomeScreen";
import ProductScreen from "./srceens/ProductScreen";
import { parseRequestUrl, showLoading, hideLoading } from "./utils";
import Error404Screen from "./srceens/Error404Screen";
import CartScreen from "./srceens/CartScreen";
import SigninScreen from "./srceens/SigninScreen";
import Header from "./components/Header";

// OBJECT "ROUTES" FUNC.:
const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
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

  // GETTING "HEADER-CONTAINER":
  const header = document.getElementById("header-container");

  // RENDER "GEADER":
  header.innerHTML = await Header.render();

  // CALLING "AFTER_RENDER" FOR "HEADER":
  await Header.after_render();

  // GETTING ACCESS TO "MAIN-CONTAINER":
  const main = document.getElementById("main-container");

  // RENDER "SCREEN":
  main.innerHTML = await screen.render();

  // RENDER "SCREEN. AFTER_RENDER":
  await screen.after_render();

  // FUNCTION CALLING:
  hideLoading();
};

// SETTING "LOAD"  EVENT → TO "ROUTER()" FUNC.:
window.addEventListener("load", router);

// ADDIN "EVENT LISTENER" → FOR "HASH CHANGE" OF THE "WINDOW":
window.addEventListener("hashchange", router);
