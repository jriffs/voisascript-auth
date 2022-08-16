const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/user", userRoute);
