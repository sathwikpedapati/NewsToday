const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnect");
const userRoute = require("./routes/userRoute");

dotenv.config();

const app = express();
connectDb(); 

app.use(express.json({ limit: "4mb" }));
app.use(cors({ credentials: true }));

app.use("/api/auth", userRoute);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to News Media Platform");
});

app.listen(PORT, () => {
  console.log(`Server is listening at${PORT}`);
});
