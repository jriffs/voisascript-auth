import express from "express";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import localBodyParser from "./utils/localBodyParser.js";
import { preparedFileMiddleware } from "./utils/multer.js";
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

app.use(cors());
app.use(express.static("./static"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(preparedFileMiddleware)
// app.use(localBodyParser) // use when req.body is empty
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/user", userRoute);
