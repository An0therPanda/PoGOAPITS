/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import { Tipo } from "../models/tipo";
import { Request, Response } from "express";

const getTipos = async (req: Request, res: Response) => {
  try {
    const tipos = await Tipo.find().sort({ _id: 1 });
    res.json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const getTipo = async (req: Request, res: Response) => {
  const tipo: string = req.params.tipo;
  if (!isNaN(Number(tipo))) {
    try {
      const tipoEncontrado = await Tipo.findById(tipo);
      if (tipoEncontrado) {
        res.json(tipoEncontrado);
      } else {
        res.status(404).json({ error: "Tipo no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  } else {
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(tipo)) {
      res.status(404).json({ error: "Tipo ingresado no válido" });
    } else {
      try {
        const tipoEncontrado = await Tipo.findOne({
          nombre: { $regex: new RegExp(tipo, "i") },
        });
        if (tipoEncontrado) {
          res.json(tipoEncontrado);
        } else {
          res.status(404).json({ error: "Tipo no encontrado" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }
  }
};

export { getTipos, getTipo };
