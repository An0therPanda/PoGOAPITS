/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import { Request, response, Response } from "express";
import { AtaqueCargado, IAtaqueCargado } from "../models/ataque_cargado";
import { AtaqueRapido, IAtaqueRapido } from "../models/ataque_rapido";

const getAtaquesCargados = async (req: Request, res: Response) => {
  const ataquesCargados = await AtaqueCargado.find()
    .populate({
      path: "tipo",
      model: "Tipos",
      select: "label",
    })
    .sort({ nombre: 1 });
  if (ataquesCargados) {
    res.json(ataquesCargados);
  }
};
const getAtaquesRapidos = async (req: Request, res: Response) => {
  const ataquesRapidos = await AtaqueRapido.find()
    .populate({
      path: "tipo",
      model: "Tipos",
      select: "label",
    })
    .sort({ nombre: 1 });
  if (ataquesRapidos) {
    res.json(ataquesRapidos);
  }
};
const getAtaqueCargado = async (req: Request, res: Response) => {
  const ataque: string = req.params.id;
  if (!isNaN(Number(ataque))) {
    try {
      const ataqueEncontrado = await AtaqueCargado.findOne({
        _id: ataque,
      });
      if (ataqueEncontrado) {
        res.json(ataqueEncontrado);
      } else {
        res.status(404).json({ error: "Ataque cargado no encontrado" });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Error en el servidor" });
    }
  } else {
    response.status(404).json({ error: "Parámetro ingresado no válido" });
  }
};
const getAtaqueRapido = async (req: Request, res: Response) => {
  const ataque: string = req.params.id;
  if (!isNaN(Number(ataque))) {
    try {
      const ataqueEncontrado = await AtaqueRapido.findOne({
        _id: ataque,
      });
      if (ataqueEncontrado) {
        res.json(ataqueEncontrado);
      } else {
        res.status(404).json({ error: "Ataque rápido no encontrado" });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Error en el servidor" });
    }
  } else {
    response.status(404).json({ error: "Parámetro ingresado no válido" });
  }
};

const patchAtaqueCargado = async (req: Request, res: Response) => {
  const idAtaque = req.params.id;
  const danopvp = req.body.pvp.dano;
  const energiapvp = req.body.pvp.energia;
  const danopve = req.body.pve.dano;
  const energiapve = req.body.pve.energia;

  if (!danopvp && !energiapvp && !danopve && !energiapve) {
    response
      .status(400)
      .json({ error: "Debe enviar al menos un dato para modificar" });
    return;
  }

  const nuevosDatos: { pvp: any; pve: any } = {
    pvp: {},
    pve: {},
  };

  if (danopvp) {
    nuevosDatos.pvp.dano = danopvp;
  }
  if (energiapvp) {
    nuevosDatos.pvp.energia = energiapvp;
  }
  if (danopve) {
    nuevosDatos.pve.dano = danopve;
  }
  if (energiapve) {
    nuevosDatos.pve.energia = energiapve;
  }
  nuevosDatos.pvp.danoporenergia = (danopvp / energiapvp).toFixed(2);

  AtaqueCargado.findByIdAndUpdate({ _id: idAtaque }, nuevosDatos, {
    new: true,
  })
    .then((ataque) => {
      if (!ataque) {
        res.status(400).json({ error: "Ataque cargado no encontrado" });
      } else {
        res.json({
          message: "Ataque cargado actualizado correctamente",
          ataque,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el ataque cargado" });
    });
};

const patchAtaqueRapido = async (req: Request, res: Response) => {
  try {
    const idAtaque = req.params.id;
    const danopvp = req.body.pvp.dano;
    const energiapvp = req.body.pvp.energia;
    const turnopvp = req.body.pvp.turno;
    const danopve = req.body.pve.dano;
    const energiapve = req.body.pve.energia;

    if (!danopvp && !energiapvp && !turnopvp && !danopve && !energiapve) {
      res
        .status(400)
        .json({ error: "Debe enviar al menos un dato para modificar" });
      return;
    }

    const nuevosDatos: { pvp: any; pve: any } = {
      pvp: {},
      pve: {},
    };

    if (danopvp) {
      nuevosDatos.pvp.dano = danopvp;
    }
    if (energiapvp) {
      nuevosDatos.pvp.energia = energiapvp;
    }
    if (turnopvp) {
      nuevosDatos.pvp.turno = turnopvp;
    }
    if (danopve) {
      nuevosDatos.pve.dano = danopve;
    }
    if (energiapve) {
      nuevosDatos.pve.energia = energiapve;
    }

    const ataque = await AtaqueRapido.findByIdAndUpdate(
      { _id: idAtaque },
      nuevosDatos,
      { new: true }
    );
    if (!ataque) {
      res.status(400).json({ error: "Ataque rápido no encontrado" });
      return;
    }
    res.json({
      message: "Ataque rápido actualizado correctamente",
      ataque,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el ataque rápido" });
  }
};

const postAgregarAtaqueCargado = async (req: Request, res: Response) => {
  const nuevoAtaqueCargado: Partial<IAtaqueCargado> = req.body;
  const ataqueCargado = new AtaqueCargado(nuevoAtaqueCargado);

  try {
    const ataqueCargadoGuardado = await ataqueCargado.save();
    res.json(ataqueCargadoGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const postAgregarAtaqueRapido = async (req: Request, res: Response) => {
  const nuevoAtaqueRapido: Partial<IAtaqueRapido> = req.body;
  const ataqueRapido = new AtaqueRapido(nuevoAtaqueRapido);

  try {
    const ataqueRapidoGuardado = await ataqueRapido.save();
    res.json(ataqueRapidoGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export {
  getAtaquesCargados,
  getAtaquesRapidos,
  getAtaqueCargado,
  getAtaqueRapido,
  patchAtaqueCargado,
  patchAtaqueRapido,
  postAgregarAtaqueCargado,
  postAgregarAtaqueRapido,
};
