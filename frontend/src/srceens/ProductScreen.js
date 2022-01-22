
// IMPORTS:
import { parseRequestUrl } from '../utils';
import { getProduct } from '../api';



// OBJECT:
const ProductScreen = {
  
  // ASYNC FUNC.:
  render: async () => {
    
    // REQUEST:
    const request = parseRequestUrl();
    
    // GETTING PRODUCT:
    const product = await getProduct(request.id);
    
    // IF "PRODUCT DO NOT EXIST"
    if (product.error) {
      return `<div>${product.error}</div>`;
    }

    // RETURN - "TEMPLATE LITERARS":
    return `<h1>${product.name}</h1>`;
  },
};


// EXPORT:.:
export default ProductScreen;
