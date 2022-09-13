const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();
const cors = require("cors");
const localBodyParser = require('./utils/localBodyParser')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, type: 'multipart/form-data' }));
app.use(localBodyParser)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/user", userRoute);
