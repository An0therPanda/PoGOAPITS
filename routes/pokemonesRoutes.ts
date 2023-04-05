/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import express from "express";
import * as pokemonesController from "../controllers/pokemones";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.get("/pokemones", pokemonesController.getPokemones);
router.get("/pokemon/:pokemon", pokemonesController.getPokemon);
router.patch(
  "/pokemon/:idPokemon",
  isAuthenticated,
  pokemonesController.patchAtaquesPokemon
);
router.post(
  "/pokemon",
  isAuthenticated,
  pokemonesController.postAgregarPokemon
);

export { router as pokemonesRouter };
