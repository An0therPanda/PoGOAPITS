/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import express from "express";
import * as tiposController from "../controllers/tipos";

const router = express.Router();

router.get("/tipos", tiposController.getTipos);
router.get("/tipo/:tipo", tiposController.getTipo);

export { router as tipoRouter };
