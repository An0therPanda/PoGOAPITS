import { Schema, model } from "mongoose";

//Creación de Interfaz
interface ITipoEficacia {
  _id: number;
  nombre: string;
}

//Creación de Esquema
const tipoEficaciaSchema = new Schema<ITipoEficacia>(
  {
    _id: { type: Number },
    nombre: { type: String },
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
const Tipo_Eficacias = model<ITipoEficacia>(
  "Tipo_Eficacias",
  tipoEficaciaSchema
);

export { Tipo_Eficacias, ITipoEficacia };
