const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("./config/db.config");
require("dotenv").config();
// const PORT = process.env.PORT || 3000;
// const saltRounds = 5;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";
const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("<h1>welcome</h1>");
});
connectDB().then(() => {
  app.listen(() => {
    console.log(`server is running`);
  });
});
