/* eslint-disable import/prefer-default-export */
// IMPORTS:
import axios from 'axios';
import { apiUrl } from './config';


// EXPORTED ASYNC FUNCTION:
export const getProduct = async (id) => {
  
  // "TRY .. CATCH" BLOCKS:
  try {

    // SENDING "AJAX REQUEST" BY "AXIOS()":
    const response = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // RESPONSE  EVALUATION:
    if (response.statusText !== 'OK') {
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
