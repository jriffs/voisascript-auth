const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/user", userRoute);
