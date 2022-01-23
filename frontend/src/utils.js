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
