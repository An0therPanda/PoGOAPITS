import { Schema, model } from "mongoose";

//Creación de Interfaz
interface ITipo {
  _id: number;
  nombre: string;
  label: string;
}

//Creación de Esquema
const tipoSchema = new Schema<ITipo>(
  {
    _id: { type: Number },
    nombre: { type: String },
    label: { type: String },
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
const Tipo = model<ITipo>("Tipos", tipoSchema);

export { Tipo, ITipo };
