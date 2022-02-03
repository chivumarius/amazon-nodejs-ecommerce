// IMPORTS:
import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

// EXPORTED ASYNC FUNCTION "GET PRODUCTS":
export const getProducts = async () => {
  try {
    // SENDING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // RESPONSE  EVALUATION:
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }

    // RETURN (FOR SUCCESS CASE):
    return response.data;
  } catch (err) {
    // IN CASE OF ERROR:
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// EXPORTED ASYNC FUNCTION "GET PRODUCT":
export const getProduct = async (id) => {
  // "TRY .. CATCH" BLOCKS:
  try {
    // SENDING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // RESPONSE  EVALUATION:
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }

    // RETURN (FOR SUCCESS CASE):
    return response.data;
  } catch (err) {
    // IN CASE OF ERROR:
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// EXPORTED ASYNC FUNCTION "CREATE PRODUCT":
export const createProduct = async () => {
  try {
    // GETTING THE "USER ADMIN TOKEN"
    const { token } = getUserInfo();

    // CREATING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // CHECKING IF THERE WAS "CREATED":
    if (response.statusText !== "Created") {
      throw new Error(response.data.message);
    }

    // OTHERWISE RETURN "DATA":
    return response.data;
  } catch (err) {
    // ERROR MESSAGE:
    return { error: err.response.data.message || err.message };
  }
};

// EXPORTED ASYNC FUNCTION "UPDATE PRODUCT":
export const updateProduct = async (product) => {
  try {
    // GETTING THE "USER ADMIN TOKEN"
    const { token } = getUserInfo();

    // CREATING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/products/${product._id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: product,
    });

    // CHECKING IF THE "STATUS TEXT" → ISN'T "OK"::
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }

    // OTHERWISE RETURN "DATA":
    return response.data;
  } catch (err) {
    // ERROR MESSAGE:
    return { error: err.response.data.message || err.message };
  }
};

// EXPORTED ASYNC FUNCTION "UPDATE PRODUCT":
export const uploadProductImage = async (formData) => {
  try {
    // GETTING THE "USER ADMIN TOKEN"
    const { token } = getUserInfo();

    // CREATING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/uploads`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    // CHECKING IF THE "STATUS TEXT" → ISN'T "OK"::
    if (response.statusText !== "Created") {
      // ERROR MESSAGE:
      throw new Error(response.data.message);
    } else {
      // RETURN "DATA":
      return response.data;
    }
  } catch (err) {
    // ERROR MESSAGE:
    return { error: err.response.data.message || err.message };
  }
};

// EXPORTED ASYNC FUNCTION "SIGN IN":
export const signin = async ({ email, password }) => {
  // "TRY .. CATCH" BLOCKS:
  try {
    // SENDING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },

      // DATA "SENT" TO "SERVER":
      data: {
        email,
        password,
      },
    });

    // RESPONSE  EVALUATION:
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }

    // RETURN (FOR SUCCESS CASE):
    return response.data;
  } catch (err) {
    // IN CASE OF ERROR:
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// EXPORTED ASYNC FUNCTION "REGISTER":
export const register = async ({ name, email, password }) => {
  // "TRY .. CATCH" BLOCKS:
  try {
    // SENDING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/users/register`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },

      // DATA "SENT" TO "SERVER":
      data: {
        name,
        email,
        password,
      },
    });

    // RESPONSE  EVALUATION:
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }

    // RETURN (FOR SUCCESS CASE):
    return response.data;
  } catch (err) {
    // IN CASE OF ERROR:
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// EXPORTED ASYNC FUNCTION "UPDATE":
export const update = async ({ name, email, password }) => {
  // "TRY .. CATCH" BLOCKS:
  try {
    // PROPERTY DESTRUCTION
    const { _id, token } = getUserInfo();

    // SENDING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      // DATA "SENT" TO "SERVER":
      data: {
        name,
        email,
        password,
      },
    });

    // RESPONSE  EVALUATION:
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }

    // RETURN "DATA" (FOR SUCCESS CASE):
    return response.data;
  } catch (err) {
    // IN CASE OF ERROR:
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// EXPORTED ASYNC FUNCTION "CREATE ORDER":
export const createOrder = async (order) => {
  try {
    // GETTIG THE "TOKEN":
    const { token } = getUserInfo();

    // SENDING "AXIOS" REQUEST:
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      data: order,
    });

    // IF "STATUS TEXT" ISN'T "CREATED":
    if (response.statusText !== "Created") {
      // IF "STATUS TEXT" ISN'T "CREATED":
      throw new Error(response.data.message);
    }

    // OTHERWISE WE WILL RETURN THE DATA
    return response.data;
  } catch (err) {
    // ERROR MESSAGE:
    return { error: err.response ? err.response.data.message : err.message };
  }
};

// EXPORTED ASYNC FUNCTION "GET ORDER":
export const getOrder = async (id) => {
  try {
    // GETTIG THE "TOKEN":
    const { token } = getUserInfo();

    // SENDING "AXIOS" REQUEST:
    const response = await axios({
      url: `${apiUrl}/api/orders/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // IF "STATUS TEXT" ISN'T "CREATED":
    if (response.statusText !== "OK") {
      // ERROR MESSAGE:
      throw new Error(response.data.message);
    }

    // OTHERWISE WE WILL RETURN THE DATA:
    return response.data;
  } catch (err) {
    // ERROR MESSAGE:
    return { error: err.message };
  }
};

// EXPORTED ASYNC FUNCTION "GET MY ORDER":
export const getMyOrders = async () => {
  try {
    // GETTIG THE "USER TOKEN":
    const { token } = getUserInfo();

    // SENDING "AXIOS" REQUEST:
    const response = await axios({
      url: `${apiUrl}/api/orders/mine`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // IF "STATUS TEXT" ISN'T "CREATED":
    if (response.statusText !== "OK") {
      // IF "STATUS TEXT" ISN'T "CREATED":
      throw new Error(response.data.message);
    }

    // OTHERWISE WE WILL RETURN THE DATA
    return response.data;
  } catch (err) {
    // ERROR MESSAGE:
    return { error: err.response ? err.response.data.message : err.message };
  }
};

// EXPORTED ASYNC FUNCTION "GET PAYPAL CLIENT ID":
export const getPaypalClientId = async () => {
  // SENDING "AXIOS" REQUEST:
  const response = await axios({
    url: `${apiUrl}/api/paypal/clientId`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // IF "STATUS TEXT" ISN'T "CREATED":
  if (response.statusText !== "OK") {
    // ERROR MESSAGE:
    throw new Error(response.data.message);
  }

  // OTHERWISE WE WILL RETURN THE "DATA CLIENT ID":
  return response.data.clientId;
};

// EXPORTED ASYNC FUNCTION "PAYPAL ORDER":
export const payOrder = async (orderId, paymentResult) => {
  try {
    // GETTIG THE "USER TOKEN":
    const { token } = getUserInfo();

    // SENDING "AXIOS" REQUEST:
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}/pay`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: paymentResult,
    });

    // IF "STATUS TEXT" ISN'T "CREATED":
    if (response.statusText !== "OK") {
      // ERROR MESSAGE:
      throw new Error(response.data.message);
    }
    // OTHERWISE WE WILL RETURN THE "DATA":
    return response.data;
  } catch (err) {
    // ERROR MESSAGE:
    return { error: err.response ? err.response.data.message : err.message };
  }
};
