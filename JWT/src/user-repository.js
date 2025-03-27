import DBlocal from "db-local";
import crypto from "crypto";
import bcrypt from "bcrypt";
// Crear la base de datos correctamente
const db = new DBlocal({ path: "./db" });

// Definir el esquema del usuario
const User = db.Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static getAll() {
    return User.find();
  }

  static async create({ username, password }) {
    // Validaciones de username y password
    Validaciones.username(username);
    Validaciones.password(password);

    // Verificar si el username ya existe
    const existingUser = User.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Crear usuario
    const id = crypto.randomUUID();

    const hashPassword = await bcrypt.hash(password, 10); //el 10 del hash significa la seguridad pero a la vez lo q taradara en hashearlo lo mejor es dejarlo en un ENV
     User.create({
      _id: id,
      username,
      password: hashPassword,
    }).save();

    return id;
  }

  static async login({ username, password }) {
    Validaciones.username(username);
    Validaciones.password(password);
    const user = User.findOne({ username });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid  password");
    }

    const {password: _, ...publicUser} = user

    return publicUser;
  }
}







class Validaciones {
  static username(username) {
    if (
      typeof username !== "string" ||
      username.length < 3 ||
      username.length > 20
    ) {
      throw new Error("Username must be between 3 and 20 characters");
    }
  }

  static password(password) {
    if (typeof password !== "string" || password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
  }
}
