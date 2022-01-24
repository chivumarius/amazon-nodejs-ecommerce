// IMP. "HOMESCRIN.JS"l
import HomeScreen from "./srceens/HomeScreen.js";
import ProductScreen from "./srceens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";
import Error404Screen from "./srceens/Error404Screen.js";
import CartScreen from "./srceens/CartScreen";
import SigninScreen from "./srceens/SigninScreen";

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
  // REQUEST:
  const request = parseRequestUrl();

  // DEFINING "PARSEURL":
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  // CONDITION:
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  // GETTING ACCESS TO "MAIN-CONTAINER":
  const main = document.getElementById("main-container");

  // RENDER "SCREEN":
  main.innerHTML = await screen.render();

  // RENDER "SCREEN. AFTER_RENDER":
  await screen.after_render();
};

// SETTING "LOAD"  EVENT → TO "ROUTER()" FUNC.:
window.addEventListener("load", router);

// ADDIN "EVENT LISTENER" → FOR "HASH CHANGE" OF THE "WINDOW":
window.addEventListener("hashchange", router);
