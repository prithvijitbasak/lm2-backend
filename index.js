require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/authRouter");
const contactRoute = require("./router/contactRouter");
const serviceRoute = require("./router/serviceRouter");
const adminRoute = require("./router/adminRouter");
const connectDb = require("./utils/db");
const cors = require("cors");
var bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");
const PORT = process.env.PORT | 5000;

// middlewares to handle requests from different origins
const corsOptions = {
  origin: '*',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// app.use(cors());

// middlewares to use json
app.use(express.json());
app.use(bodyParser.json());

// using router
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

//defining the admin route
app.use("/api/admin", adminRoute);

// middleware to handle error 
app.use(errorMiddleware);

// listening the server at the PORT
// also the server will only start if the server is connected to the database
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
