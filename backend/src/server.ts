import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import EventModel from "./models/Event";
import bodyParser from "body-parser";
import userModel, { IUser } from "./models/User";
import jwt from "jsonwebtoken";
import UserModel from "./models/User";

const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/event")
  .then(() => {
    console.log("MongoDB connection open");
  })
  .catch((err) => {
    console.log("MongoDB connection error");
    console.error(err);
  });

// User Login Route
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await UserModel.findOne({ email, password });
    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(400).send("User name or password is not valid");
    }
  } catch (err) {
    const error = err as Error;
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Token Generation
const generateTokenResponse = (user: IUser) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SomeRandomText",
    {
      expiresIn: "30d",
    }
  );

  // Add token to the user object
  return {
    ...user.toObject(),
    token,
  };
};

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
