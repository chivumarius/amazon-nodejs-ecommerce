// IMPORTS:
import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

// OBJECT:
const SigninScreen = {
  // FUNC. "AFTER_RENDER()":
  after_render: () => {
    document
      .getElementById("signin-form")
      .addEventListener("submit", async (e) => {
        // THIS FUNCTION "PREVENTS" THE "FORM"
        // FROM BEING "SENT" TO THE "SERVER"
        // AFTER "REFRESHING" AND "PRESSING" THE "BUTTON:"
        e.preventDefault();

        // FUNCTION CALLING:
        showLoading();

        // CALLING FUNC. "SIGNIN" API
        // & SENDING "REQUEST" TO THE "SERVER":
        const data = await signin({
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
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1>Sign In</h1>
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
              <button type="submit" class="primary">Signin</button>
            </li>
            
            <li>
              <div>
                New User?
                <a href="/#/register">Create your account </a>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `;
  },
};

// EXPORT:
export default SigninScreen;
