// IMPORTS:
import { update } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { showLoading, hideLoading, showMessage } from "../utils";

// OBJECT "PROFILE SCREEN":
const ProfileScreen = {
  // FUNC. "AFTER_RENDER()":
  after_render: () => {
    // SIGNOUT → WITH "EVENT LISTENER" FOR "CLICK"
    document.getElementById("signout-button").addEventListener("click", () => {
      // CLEAR "USER INFO" → FROM "LOCAL STORAGE":
      clearUser();

      // REDIRECT USER TO "HOMEPAGE":
      document.location.hash = "/";
    });

    // PROFILE FORM
    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        // THIS FUNCTION "PREVENTS" THE "FORM"
        // FROM BEING "SENT" TO THE "SERVER"
        // AFTER "REFRESHING" AND "PRESSING" THE "BUTTON:"
        e.preventDefault();

        // FUNCTION CALLING:
        showLoading();

        // CALLING FUNC. "REGISTER" API
        // & SENDING "REQUEST" TO THE "SERVER":
        const data = await update({
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

          // REDIRECT USER → TO "HOME PAGE":
          document.location.hash = "/";
        }
      });
  },

  // FUNC. "RENDER()":
  render: () => {
    //
    const { name, email } = getUserInfo();

    // IF "USER NAME" DOESN'T EXIST:
    if (!name) {
      // REDIRECT "USER" → TO "HOME PAGE":
      document.location.hash = "/";
    }

    // TEMPLATE LITERALS:
    return `
      <div class="form-container">
        <form id="profile-form">
          <ul class="form-items">

            <li>
              <h1>User Profile</h1>
            </li>

            <li>
              <label for="name">Name</label>
              <input type="name" name="name" id="name" value="${name}" />
            </li>

            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" value="${email}" />
            </li>

            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </li>

            <li>
              <button type="submit" class="primary">Update</button>
            </li>

            <li>
              <button type="button" id="signout-button" >Sign Out</button>
            </li>
          
          </ul>
        </form>
      </div>
    `;
  },
};

// EXPORT:
export default ProfileScreen;
