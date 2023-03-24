import express from "express";
import * as eficaciasController from "../controllers/eficacias";

const router = express.Router();

router.get("/eficacias/:tipo", eficaciasController.getEficacias);
router.get("/eficacia/:eficacia/:tipo", eficaciasController.getEficacia);

export { router as eficaciasRouter };
