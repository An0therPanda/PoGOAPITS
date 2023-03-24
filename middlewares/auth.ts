import { NextFunction } from "express";
import { Request, Response } from "express";
import { get, merge } from "lodash";

import { getUsuarioBySessionToken } from "../models/usuarios";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["PoGO-AUTH"];

    if (!sessionToken) {
      return res.status(400).json({ error: "No se encontró la cookie" });
    }

    const usuarioExistente = await getUsuarioBySessionToken(sessionToken);

    if (!usuarioExistente) {
      return res.status(401).json({ error: "Sesión no valida" });
    }

    merge(req, { identify: usuarioExistente });

    next();
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export { isAuthenticated };
