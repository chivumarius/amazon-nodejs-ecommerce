AMAZON - NODEJS ECOMMERCE

STEPS:

1. Create "Folder Structure"

   1. Create Root Folder as "amazon-nodejs-ecommerce"
   2. Add "frontend" and "backend" Folder
   3. Create "src" Folder in "frontend"
   4. Create "index.html" with Heading "Amazon in NodeJS" in "src"
   5. Run: npm init in "frontend" Folder
   6. Run: npm install -D live-server
   7. Add "start" Command as "live-server src --verbose"
   8. Run: npm start
   9. Check Result in Browser

2. Website Design

   1. Create "style.css"
   2. Link "style.css" to "index.html"
   3. Create "div.grid-container"
   4. Create "header", "main" and "footer"
   5. Style "html", "body"
   6. Style "grid-container", "header", "main" and "footer"

3. Create Static "Home" Screen

   1. Create "ul.products"
   2. Create "li"
   3. Create "div.product"
   4. Add ".product-image", ".product-name", ".product-brand", ".product-price"
   5. Style "ul.products" and internal "divs"
   6. Duplicate "2 Times" to show "3 Products"

4. Render Dynamic Home Screen

   1. Create data.js
   2. Export an array of 6 products
   3. Create screens/HomeScreen.js
   4. Export "HomeScreen" as an "object" with "render()" method
   5. Implement "render()"
   6. Import "data.js"
   7. Return "products" mapped to "li"-s inside an "ul"
   8. Create "app.js"
   9. Link it to "index.html" as "module"
   10. Set "main id" to "main-container"
   11. Create "router()" Function
   12. Set "main_container" "innerHTML" to "HomeScreen.render()"
   13. Set "Load Event" of "window" to "router()" Function

5. Build Url Router

   1. Create "routes" as "route:screen" Object for "Home" Screen
   2. Create "utils.js"
   3. Export "parseRequestURL()"
   4. Set "url" as "Hash Address" Split by "Slash"
   5. Return "resource", "id" and "verb" of "url"
   6. Update "router()"
   7. Set "request" as "parseRequestURL()"
   8. Build "parsedUrl" and "compare" with "routes"
   9. If "route" exists "render it", else render "Error404"
   10. Create "screens/Error404.js" and render "Error Message"

6. Create Node.JS Server

   1. Run "npm init" in Root "amazon-nodejs-ecommerce" Folder
   2. "npm install express"
   3. Create "server.js"
   4. Edd "start" Command as "node" → "backend/server.js"
   5. Require "express"
   6. Move "data.js" from "frontend" to "backend"
   7. Create "route" for "/api/products"
   8. Return "products" in "data.js"
   9. Run "npm start"

7. Load Products From Backend

   1. Edit "HomeScreen.js"
   2. Make "render" → "async"
   3. Fetch "products" from "/api/products" in "render()"
   4. Make "router()" → "async" and Call "await" → "HomeScreen.render()"
   5. Use "cors" library on "backend"

8. Add Webpack

   1. cd frontend
   2. npm install -D webpack webpack-cli webpack-dev-server
   3. npm uninstall live-server
   4. "start": "webpack-dev-server --mode development --watch-content-base --open"
   5. move index.html, style.css and images to frontend folder
   6. rename app.js to index.js
   7. update index.html
   8. add <script src="main.js"></script> before </body>
   9. npm start
   10. npm install axios
   11. change fetch to axios in HomeScreen# amazon-nodejs-ecommerce

9. Install Babel For ES6 Syntax

   1. npm install -D babel core, cli, node, preset-env
   2. Create .babelrc and set presets to @babel/preset-env
   3. "npm install -D nodemon"
   4. Set Start: nodemon --watch backend --exec babel-node backend/server.js
   5. Convert "require" to "import" in "server.js"
   6. "npm start"

10. Enable Code Linting

    1. "npm install -D eslint"
    2. Install VSCode "eslint" Extension
    3. Create ".eslintrc" and Set "module.exports" for "env" to Node
    4. Set VSCode Setting for "editor.codeActionsOnSave" "source.fixAll.eslint" to "true"
    5. Check "result" for "linting" Error
    6. "npm install eslint-config-airbnb-base" and "eslint-plugin-import"
    7. Set "extends" to "airbnb-base"
    8. Sset "parserOptions" to "ecmaVersion 11" and "sourceType" to "module"
    9. Set "rules" for "no-console" to 0 to ignore "linting" Error

11. Install VSCode Extension

    1. JavaScript (ES6) code snippets
    2. ES7 React/Redux/GraphQL/React-Native snippets
    3. Prettier - Code formatter
    4. HTML&LESS grammar injections

12. Create Rating Component

    1. Create "components/Rating.js"
    2. Link to "fontawesome.css" in "index.html"
    3. Create "div.rating"
    4. Define Rating Object with "render()"
    5. If "!props.value" → return Empty "div"
    6. Else use "fa fa-star", "fa-star-half-o" and "fa-star-o"
    7. last "span" for "props.text" || ''
    8. Style "div.rating", "span" and last "span"
    9. Edit "HomeScreen"
    10. Add "div.product-rating" and use Rating "component"

13. Product Screen

    1. Get "product id" from "request"
    2. Implement "/api/product/:id" api
    3. Send "Ajax Eequest" to "product api"
    4. Create "link" → "back to result"
    5. Create "div.details" with "3 Columns"
    6. "Column 1" → for Product "image"
    7. "Column 2" → for Product "information"
    8. "Column 3" → form Product "action"
    9. Style ".details" and "all columns"
    10. Create "add to cart button" with "add-button id"
    11. "after_render()" to Add "event" to the "button"
    12. Redirect "user" to "cart/:product_id"

14. Product Screen UI

    1. Create back to result link
    2. Create div.details with 3 columns
    3. Column 1 for product image
    4. Column 2 for product information
    5. Column 3 form product action
    6. Style .details and all columns
    7. Create add to cart button with add-button id

15. Product Screen Action

    1. "after_render()" to a"dd event" to the "button"
    2. Add "event handler" for the "button"
    3. Redirect "user" to "cart/:product_id"
    4. Implement "after_render" in "index.js"

16. Add To Cart Action

    1. create CartScreen.js
    2. "parseRequestUrl"
    3. "getProduct(request.id)"
    4. "addToCart"
    5. "getCartItems"
    6. "cartItems.find"
    7. "if existItem update qty"
    8. "else add item"
    9. "setCartItems"

17. Cart Screen UI

    1. cartItems = getCartItems()
    2. create 2 columns for cart items and cart action
    3. cartItems.length === 0 ? cart is empty
    4. show item image, name, qty and price
    5. cart action
    6. Subtotal
    7. Proceed to Checkout button
    8. Add CSS Style

18. Update and Delete Cart Items

    1. add qty select next to each item
    2. after_render()
    3. add change event to qty select
    4. getCartItems() and pass to addToCart()
    5. set force to true to addToCart()
    6. create rerender() as (component, areaName = 'content')
    7. component.render and component.after_render
    8. if force is true then rerender()
    9. add delete button next to each item
    10. add click event to qty button
    11. call removeFromCart(deleteButton.id)
    12. implement removeFromCart(id)
    13. setCartItems( getCartItems().filter)
    14. if id === parseRequestUrl().id? redirect to '/cart'
    15. else rerender(CartScreen);

19. Connect To MongoDB and Create Admin User

    1. npm install mongoose
    2. connect to mongodb
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URL
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create userRoute
    9. create createadmin route

20. Sign-in Screen UI

    1. create SigninScreen
    2. render email and password fields
    3. style signin form

21. Sign-in Screen Action

    1. after_render handle form submit
    2. create signin request in frontend
    3. create signin api in backend

22. Create Header Component

    1. Update "index.html"
    1. Add "header render" and "after render" to "router" function
    1. Sow "header menu" based on "user logged in" or "not"

23. Register Screen Action

    1. "after_render" Handle form "submit"
    2. Create "register" request in "frontend"
    3. Create "register api" in "backend"

24. User Profile UI

    1. create ProfileScreen.js
    2. style elements

25. User Profile Data

    1. Create profile info backend api
    2. Create user orders api
    3. Call apis in the backend

26. Update Profile
    1. handle form submit
    2. send request to backend
    3. create api to update profile
