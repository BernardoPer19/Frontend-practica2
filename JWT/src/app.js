import express from "express";
import { UserRepository } from "./user-repository.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { SECRET_JWT_KEY } from "../confing.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    req.session = { user: null };
    return next();
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.session = { user: data };
  } catch (error) {
    req.session = { user: null };
  }

  next();
});

// Ruta de prueba (verifica token)
app.get("/", (req, res) => {
  const { user } = req.session;
  res.send(user ? user : { message: "No user logged in" });
});

// Ruta de registro
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const id = await UserRepository.create({ username, password });

    res
      .status(201)
      .json({ id, username, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Could not create user" });
  }
});

// Ruta de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
});

// Ruta de logout
app.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logged out successfully" });
});

// Ruta protegida
app.get("/protected", (req, res) => {
  const { user } = req.session;

  if (!user) {
    return res.status(403).json({ error: "Access not authorized" });
  }

  res.json({ message: "Protected endpoint", user });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
