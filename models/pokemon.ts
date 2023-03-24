import { Schema, model, Document } from "mongoose";
import { IAtaqueCargado } from "./ataque_cargado";
import { IAtaqueRapido } from "./ataque_rapido";
import { ITipo } from "./tipo";

//Creación de interfaz
interface IPokemon {
  idpokedex: number;
  nombre: string;
  label: string;
  tipoprincipal: ITipo;
  tiposecundario: ITipo;
  generacion: number;
  ataquecargado1: IAtaqueCargado;
  ataquecargado2: IAtaqueCargado;
  ataquerapido: IAtaqueRapido;
}

//Creación de esquema
const pokemonSchema = new Schema<IPokemon>(
  {
    idpokedex: Number,
    nombre: String,
    label: String,
    tipoprincipal: {
      type: Number,
      ref: "Tipos",
    },
    tiposecundario: {
      type: Number,
      ref: "Tipos",
      required: false,
    },
    generacion: Number,
    ataquecargado1: {
      type: Number,
      ref: "Ataques_Cargados",
    },
    ataquecargado2: {
      type: Number,
      ref: "Ataques_Cargados",
      required: false,
    },
    ataquerapido: {
      type: Number,
      ref: "Ataques_Rapidos",
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

//Creación de modelo
const Pokemon = model<IPokemon>("Pokemon", pokemonSchema, "pokemones");

export { Pokemon, IPokemon };
