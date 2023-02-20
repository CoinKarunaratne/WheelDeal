import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register, login } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { getUser } from "./controllers/user.js";
import { createPost } from "./controllers/posts.js";
import publishRoutes from "./routes/posts.js";

//Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//Register & Login Routes
app.post("/auth/register", upload.single("picture"), register);
app.post("/auth/login", login);

//User profile Route
app.post("/profile/:id", verifyToken, getUser);

//Post Route
app.post("/posts/create", verifyToken, upload.single("picture"), createPost);
app.post("/posts", publishRoutes);

//Mongoose
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
