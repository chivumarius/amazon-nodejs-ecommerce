/* eslint-disable import/prefer-default-export */
// IMPORTS:
import axios from "axios";
import { apiUrl } from "./config";

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
