## server.js

```const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./db/dbinit");
connectDB();

//middleeware :this should be always be there
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //this is for form data

const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("welcome to the eCommerce-API");
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.bgGreen.black);
});
```

- This line imports the Express framework, which is used to build web applications in Node.js.

```
const express = require("express");
```

- Here, an instance of an Express application is created and assigned to the variable app.

```
 const app = express();
```

- This line loads environment variables from a .env file into process.env. This is useful for managing configuration settings.

```
require("dotenv").config();
```

- This line imports the colors package, which allows you to add colors to your console logs.

```
require("colors");
```

- This line imports the cors middleware, which is used to enable Cross-Origin Resource Sharing (CORS) in your application.

```
const cors = require("cors");
```

- This line imports a custom module dbinit from the db directory and calls the connectDB function to establish a connection to the database.

```
const connectDB = require("./db/dbinit");
connectDB();
```

- This line adds the cors middleware to the Express application, enabling CORS for all routes.

```
app.use(cors());
```

- This line adds middleware to parse incoming JSON requests and make the data available in req.body.

```
app.use(express.json());
```

- This line adds middleware to parse URL-encoded data (typically from HTML forms) and make it available in req.body. The extended: true option allows for rich objects and arrays to be encoded.

```
app.use(express.urlencoded({ extended: true }));
```

- This line sets the port number for the server to listen on. It first checks for a PORT environment variable and defaults to 8080 if not found.

```
const port = process.env.PORT || 8080;
```

- This line defines a route handler for the root URL (/). When a GET request is made to this URL, it sends back a response with the text “welcome to the eCommerce-API”.

```
app.get("/", (req, res) => {
  res.send("welcome to the eCommerce-API");
});
```

- This line starts the server and makes it listen on the specified port. It also logs a message to the console indicating that the server is running, with the text colored using the colors package.

```
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.bgGreen.black);
});
```
