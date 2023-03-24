import { Schema, model } from "mongoose";

interface IUsuario {
  username: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

const usuarioSchema = new Schema<IUsuario>(
  {
    username: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    versionKey: false,
  }
);

const Usuario = model<IUsuario>("Usuarios", usuarioSchema);

export const getUsuarios = () => Usuario.find();
export const getUsuarioBySessionToken = (sessionToken: string) =>
  Usuario.findOne({ "authentication.sessionToken": sessionToken });
export const getUsuarioByUsername = (username: string) =>
  Usuario.findOne({ username: username });
export const getUsuarioById = (id: string) => Usuario.findById(id);
export const createUser = (values: Record<string, any>) => {
  new Usuario(values).save().then((usuario) => usuario.toObject());
};

export { Usuario };
