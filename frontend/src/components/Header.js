// IMPORT:
import { getUserInfo } from "../localStorage";

// OBJECT "HEADER":
const Header = {
  // FUNC. ""RENDER:
  render: () => {
    // DESTRUCTURING OF "NAME" PROPERTY:
    const { name, isAdmin } = getUserInfo();

    // TEMPLATE LITERALS:
    return ` 
      <!-- LOGO -->
      <div class="brand">
        <a href="/#/">amazon</a>
      </div>

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

  // FUNC. "AFTER_RENDER":
  after_render: () => {},
};

// EXPORT:
export default Header;
