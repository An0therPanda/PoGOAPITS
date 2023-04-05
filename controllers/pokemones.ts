/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import { Request, Response } from "express";
import { IAtaqueCargado } from "../models/ataque_cargado";
import { IAtaqueRapido } from "../models/ataque_rapido";
import { Pokemon, IPokemon } from "../models/pokemon";
import { ITipo } from "../models/tipo";

const getPokemones = async (req: Request, res: Response) => {
  try {
    const pokemones = await Pokemon.find()
      .populate({
        path: "tipoprincipal",
        model: "Tipos",
        select: "label",
      })
      .populate({
        path: "tiposecundario",
        model: "Tipos",
        select: "label",
      })
      .populate({
        path: "ataquecargado1",
        model: "Ataques_Cargados",
        select: "nombre",
      })
      .populate({
        path: "ataquecargado2",
        model: "Ataques_Cargados",
        select: "nombre",
      })
      .populate({
        path: "ataquerapido",
        model: "Ataques_Rapidos",
        select: "nombre",
      })
      .sort({ idpokedex: 1 });
    res.json(pokemones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const getPokemon = async (req: Request, res: Response) => {
  const pokemon: string = req.params.pokemon;
  if (!isNaN(Number(pokemon))) {
    try {
      const pokemonEncontrado = await Pokemon.findOne({
        idpokedex: pokemon,
      })
        .populate({
          path: "tipoprincipal",
          model: "Tipos",
          select: "label",
        })
        .populate({
          path: "tiposecundario",
          model: "Tipos",
          select: "label",
        })
        .populate({
          path: "ataquecargado1",
          model: "Ataques_Cargados",
          select: "nombre",
        })
        .populate({
          path: "ataquecargado2",
          model: "Ataques_Cargados",
          select: "nombre",
        })
        .populate({
          path: "ataquerapido",
          model: "Ataques_Rapidos",
          select: "nombre",
        });
      if (pokemonEncontrado) {
        res.json(pokemonEncontrado);
      } else {
        res.status(404).json({ error: "Pokémon no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  } else {
    const regex = /^[a-zA-Z0-9-]+$/;
    if (!regex.test(pokemon)) {
      return res.status(404).json({ error: "Pokémon ingresado no válido" });
    } else {
      try {
        const pokemonEncontrado = await Pokemon.findOne({
          nombre: { $regex: new RegExp(pokemon, "i") },
        })
          .populate({
            path: "tipoprincipal",
            model: "Tipos",
            select: "label",
          })
          .populate({
            path: "tiposecundario",
            model: "Tipos",
            select: "label",
          })
          .populate({
            path: "ataquecargado1",
            model: "Ataques_Cargados",
            select: "nombre",
          })
          .populate({
            path: "ataquecargado2",
            model: "Ataques_Cargados",
            select: "nombre",
          })
          .populate({
            path: "ataquerapido",
            model: "Ataques_Rapidos",
            select: "nombre",
          });
        if (pokemonEncontrado) {
          res.json(pokemonEncontrado);
        } else {
          res.status(404).json({ error: "Pokémon no encontrado" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }
  }
};

const patchAtaquesPokemon = (req: Request, res: Response) => {
  const idPokemon = req.params.idPokemon;
  const idAtaqueRapido = req.body.idAtaqueRapido;
  const idAtaqueCargado1 = req.body.idAtaqueCargado1;
  const idAtaqueCargado2 = req.body.idAtaqueCargado2;

  if (!idAtaqueRapido && !idAtaqueCargado1 && !idAtaqueCargado2) {
    res
      .status(400)
      .json({ error: "Debe enviar al menos un ataque para modificar" });
    return;
  }

  const nuevosAtaques: Partial<IPokemon> = {};

  if (idAtaqueRapido) {
    nuevosAtaques.ataquerapido = idAtaqueRapido;
  }
  if (idAtaqueCargado1) {
    nuevosAtaques.ataquecargado1 = idAtaqueCargado1;
  }
  if (idAtaqueCargado2) {
    nuevosAtaques.ataquecargado2 = idAtaqueCargado2;
  }

  Pokemon.findOneAndUpdate({ idpokedex: idPokemon }, nuevosAtaques, {
    new: true,
  })
    .then((pokemon) => {
      if (!pokemon) {
        res.status(400).json({ error: "Pokémon no encontrado" });
      } else {
        res.json({
          message: "Pokémon actualizado correctamente",
          pokemon,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el Pokémon" });
    });
};

const postAgregarPokemon = async (req: Request, res: Response) => {
  const nuevoPokemon: Partial<IPokemon> = req.body;

  try {
    const pokemonExistente = await Pokemon.findOne({
      idpokedex: nuevoPokemon.idpokedex,
    });
    if (pokemonExistente) {
      return res
        .status(400)
        .json({ mensaje: "Ya existe un Pokémon con ese ID" });
    }
    const pokemon = new Pokemon(nuevoPokemon);
    const pokemonGuardado = await pokemon.save();
    res.json(pokemonGuardado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al guardar el pokémon en la base de datos" });
  }
};

export { getPokemones, getPokemon, patchAtaquesPokemon, postAgregarPokemon };
