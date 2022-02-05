// IMPORTS:
import { getUserInfo } from "../localStorage";
import { parseRequestUrl } from "../utils";

// OBJECT "HEADER":
const Header = {
  // METH. "AFTER_RENDER":
  after_render: () => {
    // CREATING EVENT LISTENER → FOR "SEARCH-FORM":
    document
      .getElementById("search-form")
      .addEventListener("submit", async (e) => {
        // PREVENTING "PAGE REFRESH"
        e.preventDefault();

        // GETTING "SERCH KET":
        const searchKeyword = document.getElementById("q").value;

        // REDIRECT "USER" → TO THE "SERCH KEYWORD"
        document.location.hash = `/?q=${searchKeyword}`;
      });
  },

  // METH. ""RENDER:
  render: () => {
    // DESTRUCTURING OF "NAME" PROPERTY:
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();

    // TEMPLATE LITERALS:
    return ` 
      <!-- LOGO -->
      <div class="brand">
        <a href="/#/">amazon</a>
      </div>

      <!-- SEARCH -->
      <div class="search">
        <form class="search-form"  id="search-form">
          <input type="text" name="q" id="q" value="${value || ""}" /> 
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>        
      </div>
      
      <!-- RIGHT MENU -->
      <div>
        ${
          name
            ? // IF "USER NAME" EXIST → SHOW THE "PROFILE" LINK:
              `<a href="/#/profile">
                ${name}
              </a>`
            : `<a href="/#/signin">Sign-In</a>`
        }       
      
        <!-- LINK "CART PAGE"  -->
        <a href="/#/cart">Cart</a>

        <!-- HECKING → IF "USER IS ADMIN": -->
        ${
          isAdmin
            ? // SHOWING LINK TO "DASHBOARD"
              `<a href="/#/dashboard">Dashboard</a>`
            : // WHEN USER ISN'T ADMIN":
              ""
        }            
          
      </div>
    `;
  },
};

// EXPORT:
export default Header;
