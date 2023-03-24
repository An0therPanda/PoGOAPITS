import { Schema, model } from "mongoose";
import { ITipo } from "./tipo";
import { ITipoEficacia } from "./tipo_eficacia";

//Creación de Interfaz
interface IEficaciaEntreTipos {
  eficacia: ITipoEficacia;
  tipo: ITipo;
  tipo_afectado: ITipo;
}

//Creación de Esquema
const eficaciaEntreTiposSchema = new Schema(
  {
    eficacia: {
      type: Number,
      ref: "Tipo_Eficacias",
      index: true,
    },
    tipo: {
      type: Number,
      ref: "Tipos",
      index: true,
    },
    tipo_afectado: {
      type: Number,
      ref: "Tipos",
      index: true,
    },
  },
  {
    populate: false,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

//Creación de Modelo
const Eficacia_Entre_Tipos = model<IEficaciaEntreTipos>(
  "Eficacia_Entre_Tipos",
  eficaciaEntreTiposSchema
);

export { Eficacia_Entre_Tipos };
