import { Request, Response } from "express";

import { getUsuarios } from "../models/usuarios";

const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await getUsuarios();
    return res.json(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export { getAllUsuarios };
