import express from "express";
import path from "path";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();
app.use(cors());
app.use("/user", userRoutes);

const port = 3000;
app.use(express.static(path.join(process.env.BUILD_PATH || " ")));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
