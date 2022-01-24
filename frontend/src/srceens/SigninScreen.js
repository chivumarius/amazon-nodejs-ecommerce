// OBJECT:
const SigninScreen = {
  // FUNC. "AFTER_RENDER()":
  after_render: () => {},

  // FUNC. "RENDER()":
  render: () => `
    <div class="form-container">
      <!-- SIGN IN FORM -->
      <form id="signin-form">
        <ul class="form-items">
          <li>
            <h1>Sign-In</h1>
          </li>

          <!-- EMAIL -->
          <li>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" />
          </li>

          <!-- PASSWORD -->
          <li>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
          </li>

          <!-- BUTTON 'SIGN IN' -->
          <li>
            <button type="submit" class="primary">Signin</button>
          </li>

          <!-- LINK "CREATE ACCOUNT" -->
          <li>
            <div>
              New User?
              <a href="/#/register">Create your account </a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `,
};

// EXPORT:
export default SigninScreen;
