import mongoose from "mongoose";

const connectionString =
  process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/DB_NAME";

//Conexión a MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Conexión exitosa!");
  })
  .catch((err) => {
    console.error(err);
  });
