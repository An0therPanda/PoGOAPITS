import { Schema, model } from "mongoose";
import { ITipo } from "./tipo";

//Creación de interfaz
interface IAtaqueRapido {
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
    turno: number;
  };
}

//Creación de esquema
const ataqueRapidoSchema = new Schema<IAtaqueRapido>(
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
      turno: Number,
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

//Creación de modelo
const AtaqueRapido = model<IAtaqueRapido>(
  "Ataques_Rapidos",
  ataqueRapidoSchema,
  "ataques_rapidos"
);

export { AtaqueRapido, IAtaqueRapido };
