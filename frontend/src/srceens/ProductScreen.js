
// IMPORTS:
import { parseRequestUrl } from '../utils';
import { getProduct } from '../api';
import Rating from '../components/Rating';




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

    
    // RETURN - "TEMPLATE LITERARS" → "PAGE STRUCTURE DESIGN":
    return `
      
      <!-- PAGE CONTENT -->
      <div class="content">

        <!-- LINK TO 'HOME PAGE' -->
        <div class="back-to-result">
          <a href="/#/">Back to result </a>
        </div>
        

        <!--  PRODUCT DETAILS -->
        <div class="details">
          
          <!-- COLUMN 1 - 'IMAGE' -->
          <div class="details-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>

          <!-- COLUMN 2 - 'INFO'  -->
          <div class="details-info">
            <ul>
              <!--  NAME -->
              <li>
                <h1>${product.name}</h1>
              </li>

              <!-- RATING -->
              <li>
              ${Rating.render({
                value: product.rating,
                text: `${product.numReviews} reviews`,
              })}
              </li>

              <!-- PRICE -->
              <li>
                Price: <strong>$${product.price}</strong>
              </li>

              <!-- DESCRIPTION -->
              <li>
                Description:
                <div>
                  ${product.description}
                </div>
              </li>
            </ul>
          </div>
          
          
          <!-- COLUMN 3 - ACTION 'add to cart' -->
          <div class="details-action">
              <ul>
                <!--PRICE -->
                <li>
                  Price: $${product.price}
                </li>

                <!-- PRODUCT STATUS -->
                <li>
                  Status : 
                    ${
                      product.countInStock > 0
                        ? `<span class="success">In Stock</span>`
                        : `<span class="error">Unavailable</span>`
                    }
                </li>

                <!-- BUTTON -->
                <li>
                    <button id="add-button" class="fw primary">Add to Cart </div>
              </ul>
          </div>
        </div>
        
      </div>
    `;
  },
};


// EXPORT:.:
export default ProductScreen;
