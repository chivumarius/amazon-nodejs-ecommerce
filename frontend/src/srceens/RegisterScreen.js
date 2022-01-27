// IMPORTS:
import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

// OBJECT:
const RegisterScreen = {
  // FUNC. "AFTER_RENDER()":
  after_render: () => {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        // THIS FUNCTION "PREVENTS" THE "FORM"
        // FROM BEING "SENT" TO THE "SERVER"
        // AFTER "REFRESHING" AND "PRESSING" THE "BUTTON:"
        e.preventDefault();

        // FUNCTION CALLING:
        showLoading();

        // CALLING FUNC. "REGISTER" API
        // & SENDING "REQUEST" TO THE "SERVER":
        const data = await register({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });

        // FUNCTION CALLING:
        hideLoading();

        // IF THERE IS AN "ERROR":
        if (data.error) {
          // SHOW ERROR MESSAGE:
          showMessage(data.error);
        } else {
          // SAVING "USER INFO" → BASED ON "DATA":
          setUserInfo(data);

          // CALLING "REDIRECT USER":
          redirectUser();
        }
      });
  },

  // FUNC. "RENDER()":
  render: () => {
    // IF "USER NAME" EXIST:
    if (getUserInfo().name) {
      // CALLING "REDIRECT USER":
      redirectUser();
    }

    // TEMPLATE LITERALS:
    return `
      <div class="form-container">
        <form id="register-form">
          <ul class="form-items">
            <li>
              <h1>Create Account</h1>
            </li>

            <li>
              <label for="name">Name</label>
              <input type="name" name="name" id="name" />
            </li>

            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" />
            </li>

            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </li>

            <li>
              <label for="repassword">Re-Enter Password</label>
              <input type="password" name="repassword" id="repassword" />
            </li>

            <li>
              <button type="submit" class="primary">Register</button>
            </li>

            <li>
              <div>
                Already have an account?
                <a href="/#/signin">Sign-In </a>
              </div>
            </li>

          </ul>
        </form>
      </div>
    `;
  },
};

// EXPORT:
export default RegisterScreen;
