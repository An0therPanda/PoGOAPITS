import express from "express";
import { getAllUsuarios } from "../controllers/usuarios";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.get("/auth/usuarios", isAuthenticated, getAllUsuarios);

export { router as usuariosRouter };
