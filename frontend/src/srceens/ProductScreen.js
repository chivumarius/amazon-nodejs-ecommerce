// IMPORTS:
import {
  parseRequestUrl,
  showLoading,
  hideLoading,
  showMessage,
  rerender,
} from "../utils";
import { createReview, getProduct } from "../api";
import Rating from "../components/Rating";
import { getUserInfo } from "../localStorage";

// OBJECT:
const ProductScreen = {
  // METH. "AFTER_FENDER":
  after_render: () => {
    // CALLING "PARSREQUEST" → TO GET "ACCESS" TO THE "ID" OF "PRODUCT"
    const request = parseRequestUrl();

    // GET "ACCESS" TO THE "ELEMENT"
    // WITH "EVENT LISTENER" → NAMED "CLICK":
    document.getElementById("add-button").addEventListener("click", () => {
      // DEFINING THE EVENT HANDLER:
      document.location.hash = `/cart/${request.id}`;
    });

    // CHECKING - IF A "REVIEW-FORM" EXIST:
    if (document.getElementById("review-form")) {
      // GET "ACCESS" → TO THE "REVIEW-FORM"
      // WITH "EVENT LISTENER" → NAMED "SUBMIT":
      document
        .getElementById("review-form")
        .addEventListener("submit", async (e) => {
          e.preventDefault();

          // CALLING "SHOW LOADEING)":
          showLoading();

          // CALLING FUNC "CREATE REVIEW()"
          const data = await createReview(request.id, {
            comment: document.getElementById("comment").value,
            rating: document.getElementById("rating").value,
          });

          // CALLING "HIDE LOADEING)":
          hideLoading();

          // IF THERE IS AN ERROR:
          if (data.error) {
            // EROR MESSAGE:
            showMessage(data.error);
          } else {
            // SUCCESS MESSAGE:
            showMessage("Review Added Successfully", () => {
              rerender(ProductScreen);
            });
          }
        });
    }
  },

  // ASYNC FUNC.:
  render: async () => {
    // REQUEST:
    const request = parseRequestUrl();

    // FUNCTION CALLING:
    showLoading();

    // GETTING PRODUCT:
    const product = await getProduct(request.id);

    // IF "PRODUCT DO NOT EXIST"
    if (product.error) {
      return `<div>${product.error}</div>`;
    }

    // FUNCTION CALLING:
    hideLoading();

    // GETTING "USER INFO":
    const userInfo = getUserInfo();

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


          <!-- REVIEW  -->          
          <div class="content">
            <h2>Reviews</h2>
            ${
              product.reviews.length === 0
                ? `<div>There is no review.</div>`
                : ""
            }  
            
            <ul class="review">
              ${product.reviews
                .map(
                  (review) =>
                    `<li>
                    <div><b>${review.name}</b></div>
                    <div class="rating-container">
                    ${Rating.render({
                      value: review.rating,
                    })}
                      <div>
                      ${review.createdAt.substring(0, 10)}
                      </div>
                    </div>
                    <div>
                    ${review.comment}
                    </div>
                  </li>`
                )
                .join("\n")}

                <li>
              
                ${
                  userInfo.name
                    ? `
                    <div class="form-container">
                      <form id="review-form">
                        <ul class="form-items">
                          <li> <h3>Write a customer reviews</h3></li>

                          <li>
                            <label for="rating">Rating</label>
                            <select required name="rating" id="rating">
                              <option value="">Select</option>
                              <option value="1">1 = Poor</option>
                              <option value="2">2 = Fair</option>
                              <option value="3">3 = Good</option>
                              <option value="4">4 = Very Good</option>
                              <option value="5">5 = Excellent</option>
                            </select>
                          </li>

                          <li>
                            <label for="comment">Comment</label>
                            <textarea required  name="comment" id="comment" ></textarea>
                          </li>

                          <li>
                            <button type="submit" class="primary">Submit</button>
                          </li>
                        </ul>
                      </form>
                    </div>`
                    : ` <div>
                      Please <a href="/#/signin">Signin</a> to write a review.
                    </div>`
                }
              </li>
            </ul> 
          </div>

        </div>
        
      </div>
    `;
  },
};

// EXPORT:.:
export default ProductScreen;
