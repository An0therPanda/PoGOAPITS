import { Request, response, Response } from "express";
import { Eficacia_Entre_Tipos } from "../models/eficacia_entre_tipos";
import { Tipo } from "../models/tipo";
import "../models/tipo";
import "../models/tipo_eficacia";

const getEficacias = async (req: Request, res: Response): Promise<void> => {
  const result: { [key: string]: any } = {};
  const tipo: string = req.params.tipo;

  if (!isNaN(Number(tipo))) {
    const eficacias = await Eficacia_Entre_Tipos.find({ tipo })
      .populate({
        path: "eficacia",
        model: "Tipo_Eficacias",
        select: "nombre",
      })
      .populate({
        path: "tipo",
        model: "Tipos",
        select: "label",
      })
      .populate({
        path: "tipo_afectado",
        model: "Tipos",
        select: "label",
      })
      .sort({ _id: 1 });
    if (eficacias) {
      eficacias.forEach((eficacia) => {
        const tipoPokemon = eficacia.tipo.label;
        const tipoAfectado = {
          id: eficacia.tipo_afectado._id,
          nombretipo: eficacia.tipo_afectado.label,
        };
        if (!result[tipoPokemon]) {
          result[tipoPokemon] = {
            doble_dano_a: [],
            mitad_dano_a: [],
            no_dano_a: [],
          };
        }
        switch (eficacia.eficacia._id) {
          case 1:
            result[tipoPokemon].doble_dano_a.push({ tipoAfectado });
            break;
          case 2:
            result[tipoPokemon].mitad_dano_a.push({ tipoAfectado });
            break;
          case 3:
            result[tipoPokemon].no_dano_a.push({ tipoAfectado });
            break;
          default:
            break;
        }
      });
      res.json(result);
    } else {
      res.status(404).json({ error: "Tipo no encontrado" });
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
          const eficacias = await Eficacia_Entre_Tipos.find({
            tipo: tipoEncontrado.id,
          })
            .populate({
              path: "eficacia",
              model: "Tipo_Eficacias",
              select: "nombre",
            })
            .populate({
              path: "tipo",
              model: "Tipos",
              select: "label",
            })
            .populate({
              path: "tipo_afectado",
              model: "Tipos",
              select: "label",
            })
            .sort({ _id: 1 });
          if (eficacias) {
            eficacias.forEach((eficacia) => {
              const tipoPokemon = eficacia.tipo.label;
              const tipoAfectado = {
                id: eficacia.tipo_afectado._id,
                nombretipo: eficacia.tipo_afectado.label,
              };
              if (!result[tipoPokemon]) {
                result[tipoPokemon] = {
                  doble_dano_a: [],
                  mitad_dano_a: [],
                  no_dano_a: [],
                };
              }
              switch (eficacia.eficacia._id) {
                case 1:
                  result[tipoPokemon].doble_dano_a.push({ tipoAfectado });
                  break;
                case 2:
                  result[tipoPokemon].mitad_dano_a.push({ tipoAfectado });
                  break;
                case 3:
                  result[tipoPokemon].no_dano_a.push({ tipoAfectado });
                  break;
                default:
                  break;
              }
            });
            res.json(result);
          } else {
            res.status(404).json({ error: "Tipo no encontrado" });
          }
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }
  }
};

const getEficacia = async (req: Request, res: Response): Promise<void> => {
  const eficacia: string = req.params.eficacia;
  const tipo: string = req.params.tipo;
  if (!isNaN(Number(tipo))) {
    try {
      const eficaciaResult = await Eficacia_Entre_Tipos.find({
        eficacia: Number(eficacia),
        tipo: tipo,
      })
        .populate({
          path: "tipo_afectado",
          model: "Tipos",
          select: "label",
        })
        .sort({ _id: 1 });
      if (eficaciaResult) {
        const eficaciaMap = eficaciaResult.map((eficacia) => ({
          tipo_afectado: {
            id: eficacia.tipo_afectado._id,
            nombretipo: eficacia.tipo_afectado.label,
          },
        }));
        res.json(eficaciaMap);
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
          const eficaciaResult = await Eficacia_Entre_Tipos.find({
            eficacia: eficacia,
            tipo: tipoEncontrado.id,
          })
            .populate({
              path: "tipo_afectado",
              model: "Tipos",
              select: "label",
            })
            .sort({ _id: 1 });
          if (eficaciaResult) {
            const eficaciaMap = eficaciaResult.map((eficacia) => ({
              tipo_afectado: {
                id: eficacia.tipo_afectado._id,
                nombretipo: eficacia.tipo_afectado.label,
              },
            }));
            res.json(eficaciaMap);
          } else {
            res.status(404).json({ error: "Tipo no encontrado" });
          }
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }
  }
};

export { getEficacias, getEficacia };
