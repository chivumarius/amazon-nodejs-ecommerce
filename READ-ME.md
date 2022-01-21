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
   11. change fetch to axios in HomeScreen