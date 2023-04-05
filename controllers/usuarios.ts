/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
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
