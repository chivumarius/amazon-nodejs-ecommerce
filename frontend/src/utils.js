// IMPORT:
import { getCartItems } from "./localStorage";

// EXPORTED FUNCTION "PARSE REQUEST URL":
export const parseRequestUrl = () => {
  // GETTING "URL":
  const url = document.location.hash.toLowerCase();

  // SPLITTING "URL" BY "/":
  const request = url.split("/");

  // RETURN → OBJECT:
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

// EXPORTED ASYNC FUNCTION "RERENDER":
export const rerender = async (component) => {
  // SETTING "COMPONENT.RENDER()":
  document.getElementById("main-container").innerHTML =
    await component.render();

  // CALLING "COMPONENT.AFTER_RENDER()":
  await component.after_render();
};

// EXPORTED FUNCTION "SHOW LOADING":
export const showLoading = () => {
  // ADD LISTENER FOR CLS. "ACTIVE":
  document.getElementById("loading-overlay").classList.add("active");
};

// EXPORTED FUNCTION "HIDE LOADING":
export const hideLoading = () => {
  // REMOVE LISTENER FROM CLS. "ACTIVE":
  document.getElementById("loading-overlay").classList.remove("active");
};

// EXPORTED FUNCTION "SHOW MESSAGE":
export const showMessage = (message, callback) => {
  // MESSAGE
  document.getElementById("message-overlay").innerHTML = `
    <div>
      <!-- MESSAHE -->  
     <div id="message-overlay-content">${message}</div>
    
      <!-- BUTTON -->  
      <button id="message-overlay-close-button">OK</button>
    </div>
  `;

  // ADD LISTENER FOR CLS. "ACTIVE":
  document.getElementById("message-overlay").classList.add("active");

  // EVENT LISTENER → FOR "CLOSE" BUTTON:
  document
    .getElementById("message-overlay-close-button")
    .addEventListener("click", () => {
      // REMOVE LISTENER FROM CLS. "ACTIVE":
      document.getElementById("message-overlay").classList.remove("active");

      // IF THERE IS "CALLBACK"
      if (callback) {
        // CALL IT:
        callback();
      }
    });
};

// EXPORTED FUNCTION "REDIRECT USER":
export const redirectUser = () => {
  // SHOW NUMBER OF ITEMS:
  console.log(getCartItems().length);

  // REDIRECT CONDITION:
  // CHECKING IF THERE ARE "ITEMS" ON THE "CART":
  if (getCartItems().length !== 0) {
    // REDIRECT "USER" → TO "SHIPPING" SCREEN:
    document.location.hash = "/shipping";
  } else {
    // REDIRECT "USER" → TO "HOME" SCREEN:
    document.location.hash = "/";
  }
};
