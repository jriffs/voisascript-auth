import express from "express";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import localBodyParser from "./utils/localBodyParser.js";
import { preparedFileMiddleware } from "./utils/multer.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(preparedFileMiddleware)
// app.use(localBodyParser) // use when req.body is empty
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/user", userRoute);
