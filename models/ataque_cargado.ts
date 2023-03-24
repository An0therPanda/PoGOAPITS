import { Schema, model } from "mongoose";
import { ITipo } from "./tipo";

//Creación de Interfaz
interface IAtaqueCargado {
  _id: number;
  nombre: string;
  tipo: ITipo;
  pve: {
    dano: number;
    energia: number;
  };
  pvp: {
    dano: number;
    energia: number;
    danoporenergia: Schema.Types.Decimal128;
  };
}

//Creación de Esquema
const ataqueCargadoSchema = new Schema<IAtaqueCargado>(
  {
    _id: { type: Number },
    nombre: { type: String },
    tipo: {
      type: Number,
      ref: "Tipos",
    },
    pve: {
      dano: Number,
      energia: Number,
    },
    pvp: {
      dano: Number,
      energia: Number,
      danoporenergia: Schema.Types.Decimal128,
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

//Creación de Modelo
const AtaqueCargado = model<IAtaqueCargado>(
  "Ataques_Cargados",
  ataqueCargadoSchema,
  "ataques_cargados"
);

export { AtaqueCargado, IAtaqueCargado };
