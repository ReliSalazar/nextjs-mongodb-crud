import { connect, connection } from "mongoose";

const { MONGODB_URL } = process.env;
const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) return;
  const db = await connect(MONGODB_URL ?? "");
  conn.isConnected = Boolean(db.connections[0].readyState);
  console.log(db.connection.db.databaseName);
}

connection.on("connected", () => {
  console.log("Mongodb is connected");
});

connection.on("error", (err) => {
  console.error(err);
});
