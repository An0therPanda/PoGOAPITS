import { Request, Response } from "express";
import { createUser, getUsuarioByUsername } from "../models/usuarios";
import { authentication, random } from "../helpers/helper";

const registrar = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(500);
    }

    const usuarioExistente = await getUsuarioByUsername(username);
    if (usuarioExistente) {
      return res.status(500);
    }

    const salt = random();
    const usuario = createUser({
      username,
      password,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(500);
    }

    const usuario = await getUsuarioByUsername(username).select(
      "+authentication.salt + authentication.password"
    );

    if (!usuario) {
      return res.status(500);
    }

    const expectedHash = authentication(usuario.authentication.salt, password);

    if (usuario.authentication.password != expectedHash) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const salt = random();
    usuario.authentication.sessionToken = authentication(
      salt,
      usuario._id.toString()
    );

    await usuario.save();

    res.cookie("PoGO-AUTH", usuario.authentication.sessionToken, {
      domain: process.env.AUTH_DOMAIN,
      path: "/",
    });
    console.log(process.env);
    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

const logout = async (req: Request, res: Response) => {
  res.cookie("PoGO-AUTH", "", {
    expires: new Date(0),
    domain: process.env.AUTH_DOMAIN,
    path: "/",
  });
  res.status(200).send("Cierre de sesión exitoso");
};
export { registrar, login, logout };
