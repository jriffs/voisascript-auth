import express from "express";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/user", userRoute);
